$(document).ready(function() {
  var today = new Date().toISOString().split('T')[0];
  $("#sales_start_date").attr('max', today);
  $("#sales_end_date").attr('max', today).prop('disabled', true);
  $("#candleinventory_start_date").attr('max', today);
  $("#candleinventory_end_date").attr('max', today).prop('disabled', true);
  $("#inventory_start_date").attr('max', today);
  $("#inventory_end_date").attr('max', today).prop('disabled', true);

  function checkDate(id_start, id_end) {
      var start = $("#" + id_start).val();
      var end = $("#" + id_end).val();
      if (start > end) {
          $("#" + id_end).val(start);
      }
      $("#" + id_end).attr('min', start);
  }

  $("#sales_start_date").change(function() {
      if(this.value) {
          $("#sales_end_date").prop('disabled', false);
          checkDate("sales_start_date", "sales_end_date");
      } else {
          $("#sales_end_date").prop('disabled', true);
      }
  });

  $("#candleinventory_start_date").change(function() {
      if(this.value) {
          $("#candleinventory_end_date").prop('disabled', false);
          checkDate("candleinventory_start_date", "candleinventory_end_date");
      } else {
          $("#candleinventory_end_date").prop('disabled', true);
      }
  });

  $("#inventory_start_date").change(function() {
      if(this.value) {
          $("#inventory_end_date").prop('disabled', false);
          checkDate("inventory_start_date", "inventory_end_date");
      } else {
          $("#inventory_end_date").prop('disabled', true);
      }
  });

  populateCandleDropdown();
  refreshData();
  populatechart();

function populatechart() {
  console.log("populate chart function called");
  $.ajax({
    url: 'most_sold_product.php',
    type: 'get',
    dataType: 'json',
    success: function(response) {
      console.log("Response received:", response); // Log the response

      // Check if response is an array
      if (Array.isArray(response)) {
        var labels = response.map(function(e) {
          return e.candle_type;
        });
        var data = response.map(function(e) {
          return e.total_amount;
        });

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total Quantity Sold',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  callback: function(value, index, values) {
                    return Number(value).toFixed(0);
                  }
                }
              }
            },
            title: {
              display: true,
              text: 'Candle Sales'
            }
          }
        });

        // Display all candle types with their total quantities at the top of the chart
        var chartTitle = labels.map(function(label, index) {
          return label + ': ' + data[index];
        }).join(', ');
        document.getElementById('chartTitle').innerText = chartTitle; // Update the content of the div
      } else {
        // Handle non-array response
        console.log(response.message);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("Error occurred:", textStatus, errorThrown); // Log any errors
    }
  });
}

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
            $('#candle-quantity').val(selectedCandle ? selectedCandle.max_producible_cartons + selectedCandle.max_producible_pieces : '');
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
            // Clear the "Quantity Sold" and "Place" inputs
            $('#sale-quantity').val('');
            $('#sale-place').val('');
          },
          error: function(xhr, status, error) {
            console.error(error);
            alert('Error recording sale. Please try again later.'); // Alert error message
            // Clear the "Quantity Sold" and "Place" inputs
            $('#sale-quantity').val('');
            $('#sale-place').val('');
          }
        });
      } else {
        alert('Sale canceled. Please review the details and try again.'); // Alert the cancellation
      }
    } else {
      alert('Invalid quantity. Please enter an integer value less than or equal to the maximum quantity.'); // Alert invalid quantity
    }
  });
  
});   // Fetch data from the server
// Fetch data from the server
async function fetchData() {
  try {
    const response = await fetch('dataHandler.php');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('There was a problem with the fetch operation: ' + e.message);
  }
}

// Populate the table
async function populateTable() {
  try {
    // Clear the table first
    const table = document.getElementById('sales_table');
    table.innerHTML = '';

    // Create table header
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = ['Candle Name', 'Quantity', 'Place', 'Delete', 'Update'];
    headers.forEach((header, i) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    const data = await fetchData();
    data.forEach((item, i) => {
      const row = table.insertRow(i+1); // +1 to account for header row
      Object.values(item).forEach((value, j) => {
        if (j > 0) { // Skip the id
          const cell = row.insertCell(j-1);
          cell.textContent = value;
        }
      });
      const deleteCell = row.insertCell(-1);
      const updateCell = row.insertCell(-1);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.backgroundColor = 'red';
      deleteButton.style.color = 'white';
      deleteButton.style.border = 'none';
      deleteButton.style.padding = '15px 32px';
      deleteButton.style.textAlign = 'center';
      deleteButton.style.textDecoration = 'none';
      deleteButton.style.display = 'inline-block';
      deleteButton.style.fontSize = '16px';
      deleteButton.style.margin = '4px 2px';
      deleteButton.style.cursor = 'pointer';
      deleteButton.addEventListener('click', () => openModal(item, 'delete'));
      deleteCell.appendChild(deleteButton);
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.style.backgroundColor = 'gray';
      updateButton.style.color = 'white';
      updateButton.style.border = 'none';
      updateButton.style.padding = '15px 32px';
      updateButton.style.textAlign = 'center';
      updateButton.style.textDecoration = 'none';
      updateButton.style.display = 'inline-block';
      updateButton.style.fontSize = '16px';
      updateButton.style.margin = '4px 2px';
      updateButton.style.cursor = 'pointer';
      updateButton.addEventListener('click', () => openModal(item, 'update'));
      updateCell.appendChild(updateButton);
    });

    // Style the table
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.querySelectorAll('th, td').forEach(cell => {
      cell.style.border = '1px solid black';
      cell.style.padding = '8px';
      cell.style.textAlign = 'left';
    });
    table.querySelectorAll('tr:nth-child(even)').forEach(row => {
      row.style.backgroundColor = '#f2f2f2';
    });
    table.querySelectorAll('tr:nth-child(odd)').forEach(row => {
      row.style.backgroundColor = '#dcdcdc';
    });
  } catch (e) {
    console.log('There was a problem with the fetch operation: ' + e.message);
  }
}

// Open modal
function openModal(item, action) {
  // Create modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.zIndex = '1';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.overflow = 'auto';
  modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#fefefe';
  modalContent.style.margin = '15% auto';
  modalContent.style.padding = '20px';
  modalContent.style.border = '1px solid #888';
  modalContent.style.width = '80%';
  modalContent.style.maxHeight = '70vh'; // Limit the height of the modal content
  modalContent.style.overflowY = 'auto'; // Make the modal content scrollable

  // Create a table in the modal content
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  
  // Create header row
  const headerRow = table.insertRow(0);
  Object.keys(item).forEach((key, i) => {
    if (i > 0) { // Skip the id
      const th = document.createElement('th');
      th.textContent = key;
      th.style.border = '1px solid black';
      th.style.padding = '8px';
      th.style.textAlign = 'left';
      headerRow.appendChild(th);
    }
  });

  // Create data row
  const dataRow = table.insertRow(1);
  Object.values(item).forEach((value, i) => {
    if (i > 0) { // Skip the id
      const cell = dataRow.insertCell(i-1);
      cell.textContent = value;
      cell.style.border = '1px solid black';
      cell.style.padding = '8px';
      cell.style.textAlign = 'left';
    }
  });

  modalContent.appendChild(table);

  // Create a div for the buttons
  const buttonDiv = document.createElement('div');
  buttonDiv.style.textAlign = 'right'; // Align the buttons to the right

  // Add action button to the div
  const actionButton = document.createElement('button');
  actionButton.textContent = action.charAt(0).toUpperCase() + action.slice(1);
  actionButton.style.backgroundColor = action === 'delete' ? 'red' : 'green';
  actionButton.style.marginRight = '10px';
  actionButton.style.color = 'white';
  actionButton.style.border = 'none';
  actionButton.style.padding = '15px 32px';
  actionButton.style.textAlign = 'center';
  actionButton.style.textDecoration = 'none';
  actionButton.style.display = 'inline-block';
  actionButton.style.fontSize = '16px';
  actionButton.style.margin = '4px 2px';
  actionButton.style.cursor = 'pointer';
  actionButton.addEventListener('click', async () => {
    if (action === 'delete') {
      await deleteRow(item.id);
    } else if (action === 'update') {
      // Get new data from the user
      const newData = prompt('Enter new data');
      await updateRow(item.id, newData);
    }
    modal.style.display = 'none';
    await populateTable(); // Refresh the table
    populateCandleDropdown();
    refreshData();
    populatechart();
  });
  buttonDiv.appendChild(actionButton);

  // Add close button to the div
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.backgroundColor = 'gray';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.padding = '15px 32px';
  closeButton.style.textAlign = 'center';
  closeButton.style.textDecoration = 'none';
  closeButton.style.display = 'inline-block';
  closeButton.style.fontSize = '16px';
  closeButton.style.margin = '4px 2px';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  buttonDiv.appendChild(closeButton);

  // Add the div to the modal content
  modalContent.appendChild(buttonDiv);

  // Add modal content to modal
  modal.appendChild(modalContent);

  // Add modal to body
  document.body.appendChild(modal);
}

// Delete a row
async function deleteRow(id) {
  try {
    const response = await fetch(`dataHandler.php?id=${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    console.log('There was a problem with the fetch operation: ' + e.message);
  }
}

// Update a row
async function updateRow(id, newData) {
  try {
    const response = await fetch(`dataHandler.php?id=${id}&newData=${newData}`, { method: 'PUT' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    console.log('There was a problem with the fetch operation: ' + e.message);
  }
}

// Call populateTable when the page loads
window.onload = populateTable;
