$(document).ready(function() {
  // Function to fetch candle names from the database and populate the dropdown
  function populateCandleDropdown() {
    $.ajax({
      url: 'get_candles.php',
      method: 'GET',
      success: function(data) {
        // Parse JSON response
        var candles = JSON.parse(data);
        // Empty the dropdown options
        $('#sale-product').empty();
        // Add options dynamically
        candles.forEach(function(candle) {
          $('#sale-product').append(`<option value="${candle.name}">${candle.name}</option>`);
        });
      },
      error: function(xhr, status, error) {
        console.error(error);
        alert('Error fetching candle names. Please try again later.'); // Alert the error message
      }
    });
  }
  // Call the function to populate dropdowns on page load
  populateCandleDropdown();

  ///////////////////////////////////////////////////////////////////////////////////////
  function refreshData() {
    $.ajax({
      url: 'getwaxamount.php',
      method: 'GET',
      dataType: 'json', // Ensure that the returned data is parsed as JSON
      success: function(data) {
        console.log(data); // Log the response

        // Update the available wax field
        $('#inventory-wax').val(data.total_sum);

        // Clear the existing options in the dropdown
        var select = $('#inventoryproduct');
        select.empty();

        // Check if the candleseach array exists in the data
        if (data.candleseach && Array.isArray(data.candleseach)) {
          // Populate the candle name dropdown
          data.candleseach.forEach(function(candle) {
            select.append(new Option(candle.name, candle.name));
          });

          // Update the max quantity field when a candle is selected
          select.change(function() {
            var selectedCandle = data.candleseach.find(candle => candle.name === this.value);
            $('#candle-quantity').val(selectedCandle ? selectedCandle.max_producible_cartons * 30 + selectedCandle.max_producible_pieces : '');
          });

          // Trigger the change event to update the max quantity field for the initially selected candle
          select.trigger('change');
        } else {
          console.error('Error: candleseach array not found in the response data');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error:', errorThrown);
        alert('Error fetching data. Please try again later.');
      }
    });
  }

  // Call the function to refresh the data
  refreshData();

  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $('#sale-form').submit(function(e) {
    e.preventDefault();
    var candleName = $('#sale-product').val();
    var quantity = $('#sale-quantity').val();
    
    // Display confirmation popup
    var confirmed = confirm(`Are you sure you want to record the sale of ${quantity} units of ${candleName}?`);
    
    if (confirmed) {
      // Perform AJAX call to record the sale
      $.ajax({
        url: 'record_sale.php',
        method: 'POST',
        data: { candleName: candleName, quantity: quantity },
        success: function(response) {
          alert(response); // Alert success message
          // Refresh dropdowns after successful sale recording
          populateCandleDropdown();
        },
        error: function(xhr, status, error) {
          console.error(error);
          alert('Error recording sale. Please try again later.'); // Alert error message
        }
      });
    } else {
      alert('Sale canceled. Please review the details and try again.'); // Alert the cancellation
    }
  });
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle form submission for adding stock
$('#stock-form').off('submit').on('submit', function(e) {
  e.preventDefault();
  var description = $('#stock-description').val();
  var bagNumber = parseInt($('#stock-bag-number').val());
  var weight = parseFloat($('#stock-weight').val());
  var place = $('#stock-place').val();
  var remark = $('#stock-remark').val();

  // Check if inputs are of correct type
  if (isNaN(bagNumber) || isNaN(weight)) {
    alert('Invalid input. Please enter a number for bag number and weight.');
    return;
  }

  // Calculate total
  var total = bagNumber * weight;

  // Display confirmation popup with inputted values
  $('#confirm-text').html(`
    <h2>Confirmation</h2>
    <table>
      <tr><td>Description:</td><td>${description}</td></tr>
      <tr><td>Bag Number:</td><td>${bagNumber}</td></tr>
      <tr><td>Weight:</td><td>${weight}</td></tr>
      <tr><td>Total:</td><td>${total}</td></tr>
      <tr><td>Place:</td><td>${place}</td></tr>
      <tr><td>Remark:</td><td>${remark}</td></tr>
    </table>
  `);
  $('#popup-confirm').show();

  // Close popup when close button is clicked
  $('#popup-confirm .close').off('click').on('click', function() {
    $('#popup-confirm').hide();
  });

  $('#confirm').off('click').on('click', function() {
    $('#popup-confirm').hide();
    // Perform AJAX call to add stock
    $.ajax({
      url: 'add_stock.php',
      method: 'POST',
      data: { description: description, bagNumber: bagNumber, weight: weight, total: total, place: place, remark: remark },
      success: function(response) {
        // Clear form inputs
        $('#stock-form').trigger("reset");
        // Parse the response
        var data = JSON.parse(response);
        // Show popup with inserted data
        $('#result-text').html(`
          <h2>Inserted Data</h2>
          <table>
            <tr><td>ID:</td><td>${data.id}</td></tr>
            <tr><td>Date:</td><td>${data.date}</td></tr>
            <tr><td>Description:</td><td>${data.description}</td></tr>
            <tr><td>Bag Number:</td><td>${data.bagNumber}</td></tr>
            <tr><td>Weight:</td><td>${data.weight}</td></tr>
            <tr><td>Total:</td><td>${data.total}</td></tr>
            <tr><td>Place:</td><td>${data.place}</td></tr>
            <tr><td>Remark:</td><td>${data.remark}</td></tr>
          </table>
        `);
        $('#popup-result').show();
      },
      error: function(xhr, status, error) {
        console.error(error);
        alert('Error adding stock. Please try again later.'); // Alert error message
        // Clear form inputs
        $('#stock-form').trigger("reset");
      }
    });
  });

  // Close result popup when close button is clicked
  $('#popup-result .close, #close').off('click').on('click', function() {
    $('#popup-result').hide();
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Handle form submission for recording sale
 // Handle form submission for recording sale
 $('#sale-form').submit(function(e) {
  e.preventDefault();
  var candleName = $('#sale-product').val();
  var quantity = $('#sale-quantity').val();
  
  // Display confirmation popup
  var confirmed = confirm(`Are you sure you want to record the sale of ${quantity} units of ${candleName}?`);
  
  if (confirmed) {
    // Perform AJAX call to record the sale
    $.ajax({
      url: 'record_sale.php',
      method: 'POST',
      data: { candleName: candleName, quantity: quantity },
      success: function(response) {
        alert(response); // Alert success message
        // Refresh dropdowns after successful sale recording
        populateCandleDropdown();
      },
      error: function(xhr, status, error) {
        console.error(error);
        alert('Error recording sale. Please try again later.'); // Alert error message
      }
    });
  } else {
    alert('Sale canceled. Please review the details and try again.'); // Alert the cancellation
  }
});


});
