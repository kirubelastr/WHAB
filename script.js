$(document).ready(function() {
   //populate the sales dropdown
    function populateCandleDropdown() {
      console.log("populateCandleDropdown function called");
      $.ajax({
        url: 'get_candles.php',
        method: 'GET',
        dataType: 'json', // Ensure that the returned data is parsed as JSON
        success: function(data) {
          console.log(data); // Log the response

          // Clear the existing options in the dropdown
          var select = $('#sale-product');
          select.empty();

          // Check if the candles object exists in the data
          if (data && typeof data === 'object') {
            // Populate the candle name dropdown
            Object.keys(data).forEach(function(candle) {
              select.append(new Option(candle, candle));
            });

            // Update the max quantity field when a candle is selected
            select.change(function() {
              var selectedCandle = data[this.value];
              $('#max-quantity').val(selectedCandle);
            });

            // Trigger the change event to update the max quantity field for the initially selected candle
            select.trigger('change');
          } else {
            console.error('Error: candles object not found in the response data');
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error:', errorThrown);
          alert('Error fetching data. Please try again later.');
        }
      });
  }

  //refresh the max quantity and also the max wax available
  function refreshData() { 
    console.log("refresh function called");
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
  populateCandleDropdown();
  refreshData();

  $('#stock-form').off('submit').on('submit', function(e) {
    console.log("stockform called");
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
          refreshData();
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

  $('#inventory-form').submit(function(e) {
    e.preventDefault();
    var candleName = $('#inventoryproduct').val();
    var maxwax = parseInt($('#inventory-wax').val());
    var quantity = parseInt($('#inventory-quantity').val());
    var maxquantity = parseInt($('#candle-quantity').val());
  
    // Check if inputs are of correct type and within valid range
    if (isNaN(maxquantity) || isNaN(quantity)) {
      alert('Invalid input. Please enter a number for quantity and maximum quantity.');
      return;
    }
    if (quantity > maxquantity) {
      alert('Invalid input. Please enter a quantity less than or equal to the maximum quantity.');
      return;
    }
  
    // Display confirmation popup
    var confirmed = confirm(`Are you sure you want to record the production of ${quantity} units of ${candleName}?`);
  
    if (confirmed) {
      // Perform AJAX call to record the sale
      $.ajax({
        url: 'record_inventory_candle.php',
        method: 'POST',
        data: { candleName: candleName, quantity: quantity, maxwax: maxwax },
        success: function(response) {
          alert(response); // Alert success message
          // Refresh dropdowns after successful sale recording
          populateCandleDropdown();
          refreshData();
  
          // Reset the form
          $('#inventory-form')[0].reset();
        },
        error: function(xhr, status, error) {
          console.error(error);
          alert('Error recording candle production. Please try again later.'); // Alert error message
  
          // Reset the form
          $('#inventory-form')[0].reset();
        }
      });
    } else {
      alert('Production canceled. Please review the details and try again.'); // Alert the cancellation
    }
  });
  
  $('#sale-form').submit(function(e) {
    e.preventDefault();
    var candleName = $('#sale-product').val();
    var maxQuantity = parseInt($('#max-quantity').val());
    var quantity = parseInt($('#sale-quantity').val());
    var saleplace= $('#sale-place').val();
  
    // Check if quantity is an integer and less than or equal to max quantity
    if (Number.isInteger(quantity) && quantity <= maxQuantity) {
      // Display confirmation popup
      var confirmed = confirm(`Are you sure you want to record the sale of ${quantity} units of ${candleName} to ${saleplace}?`);
  
      if (confirmed) {
        // Perform AJAX call to record the sale
        $.ajax({
          url: 'record_sale.php',
          method: 'POST',
          data: { candleName: candleName, quantity: quantity ,saleplace:saleplace },
          success: function(response) {
            alert(response); // Alert success message
            // Refresh dropdowns after successful sale recording
            populateCandleDropdown();
            // Reset the form
            $('#sale-form')[0].reset();
          },
          error: function(xhr, status, error) {
            console.error(error);
            alert('Error recording sale. Please try again later.'); // Alert error message
            // Reset the form
            $('#sale-form')[0].reset();
          }
        });
      } else {
        alert('Sale canceled. Please review the details and try again.'); // Alert the cancellation
        // Reset the form
        $('#sale-form')[0].reset();
      }
    } else {
      alert('Invalid quantity. Please enter an integer value less than or equal to the maximum quantity.'); // Alert invalid quantity
      // Reset the form
      $('#sale-form')[0].reset();
    }
  });
  

});
  