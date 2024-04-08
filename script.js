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
            $('#candle-quantity').val(selectedCandle ? parseInt(selectedCandle.max_producible_cartons) : '');

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
          
          // Destroy existing chart if it exists
          if(window.myChart instanceof Chart){
              window.myChart.destroy();
          }
          
          window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Total Quantitys Sold',
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
  
          var chartTitle = labels.map(function(label, index) {
            return label + ': ' + data[index];
          }).join('\n');
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
function fetchDatabox() {
  fetch('getdata.php')
  .then(response => response.json())
  .then(data => {
    const candleContainer = document.getElementById('candleContainer');
    data.candles.forEach(candle => {
      const div = document.createElement('div');
      div.className = 'candle';
      div.textContent = `Type: ${candle.name}, Amount: ${candle.total_amount}`;
      candleContainer.appendChild(div);
    });

    const totalWax = document.getElementById('totalWax');
    totalWax.textContent = `${data.total_wax} kg`;
  })
  .catch(error => console.error('Error:', error));
}
  
$(document).ready(function() {
  fetchDatabox();
  populateCandleDropdown();
  refreshData();
  populatechart();

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
    var saleplace = $('#sale-place').val();

    // Check if quantity is an integer and less than or equal to max quantity
    if (Number.isInteger(quantity) && quantity <= maxQuantity) {
        // Display confirmation popup
        var confirmed = confirm(`Are you sure you want to record the sale of ${quantity} units of ${candleName} to ${saleplace}?`);

        if (confirmed) {
            // Perform AJAX call to record the sale
            $.ajax({
                url: 'record_sale.php',
                method: 'POST',
                data: { candleName: candleName, quantity: quantity, saleplace: saleplace },
                success: function(response) {
                    alert(response); // Alert success message
                    // Clear the "Quantity Sold" and "Place" inputs
                    $('#sale-quantity').val('');
                    $('#sale-place').val('');

                    // After successful sale recording, update the UI
                    populateTable();
                    populatechart();
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

  
});   
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
    const headers = ['Candle Name', 'Quantity', 'Place', 'Date', 'Modify'];
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
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button'; // Add this line
      deleteButton.addEventListener('click', () => openModal(item, 'delete', 'sales_table'));
      deleteCell.appendChild(deleteButton);
    });
  } catch (e) {
    console.log('There was a problem with the fetch operation: ' + e.message);
  }
}

// Open modal
function openModal(item, action,tablename) {
  // Create modal

  const modal = document.createElement('div');
  modal.className = 'modal';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create a table in the modal content
  const table = document.createElement('table');
  table.className = 'common-table';
  
  // Create header row
  const headerRow = table.insertRow(0);
  Object.keys(item).forEach((key, i) => {
    if (i > 0) { // Skip the id
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    }
  });

  // Create data row
  const dataRow = table.insertRow(1);
  Object.values(item).forEach((value, i) => {
    if (i > 0) { // Skip the id
      const cell = dataRow.insertCell(i-1);
      cell.textContent = value;
    }
  });

  modalContent.appendChild(table);

  // Create a div for the buttons
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'button-div';

  // Add action button to the div
  const actionButton = document.createElement('button');
  actionButton.textContent = action.charAt(0).toUpperCase() + action.slice(1);
  actionButton.className = action === 'delete' ? 'delete-button' : 'action-button';
  actionButton.addEventListener('click', async () => {
    console.log(tablename);
    if (action === 'delete') {
      if(tablename==='sales_table' ){
        await deleteRowsales_table(item.id);
      }
      if (tablename==='candleinventory_table') {
        await deleteRowcandleinventory_table(item.id);
      }
      if (tablename==='inventory_table') {
        await deleteRowinventory_table(item.id);
      }
    }
    modal.style.display = 'none';
    if(tablename==='sales_table' ){
      populateTable().then(function() {
        populatechart()
        populateCandleDropdown();
      });
    }
    if (tablename==='candleinventory_table') {
      populateTablecandleinv().then(function() {
        refreshData();
      });
    }
    if (tablename==='inventory_table') {
      populateTablewaxinv(); // Refresh the table
    }
  });
  buttonDiv.appendChild(actionButton);

  // Add close button to the div
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.className = 'close-button';
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
async function deleteRowsales_table(id) {
  try {
    const response = await fetch(`dataHandler.php?id=${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    alert('There was a problem with the fetch operation. ' + e.message);
  }
}

async function fetchDatacandleinv() {
  try {
    const response = await fetch('dataHandlercandleinv.php');
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
async function populateTablecandleinv() {
  try {
    // Clear the table first
    const table = document.getElementById('candleinventory_table');
    table.innerHTML = '';

    // Create table header
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = ['Candle Name', 'amount', 'Date', 'Modify'];
    headers.forEach((header, i) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    const data = await fetchDatacandleinv();
    data.forEach((item, i) => {
      const row = table.insertRow(i+1); // +1 to account for header row
      Object.values(item).forEach((value, j) => {
        if (j > 0) { // Skip the id
          const cell = row.insertCell(j-1);
          cell.textContent = value;
        }
      });
      const deleteCell = row.insertCell(-1);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button'; // Add this line
      deleteButton.addEventListener('click', () => openModal(item, 'delete', 'candleinventory_table'));
      deleteCell.appendChild(deleteButton);
    });
  } catch (e) {
    console.log('There was a problem with the fetch operation: ' + e.message);
  }
}

// Delete a row
async function deleteRowcandleinventory_table(id) {
  try {
    const response = await fetch(`dataHandlercandleinv.php?id=${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    alert('There was a problem with the fetch operation. ' + e.message);
  }
}
async function fetchDatawaxinv() {
  try {
    const response = await fetch('dataHandlerwaxinv.php');
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
async function populateTablewaxinv() {
  try {
    // Clear the table first
    const table = document.getElementById('inventory_table');
    table.innerHTML = '';

    // Create table header
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headers = ['discription', 'bag_number', 'weight', 'total', `place`, `remark`, `date`];
    headers.forEach((header, i) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    const data = await fetchDatawaxinv();
    data.forEach((item, i) => {
      const row = table.insertRow(i+1); // +1 to account for header row
      Object.values(item).forEach((value, j) => {
        if (j > 0) { // Skip the id
          const cell = row.insertCell(j-1);
          cell.textContent = value;
        }
      });
      const deleteCell = row.insertCell(-1);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button'; // Add this line
      deleteButton.addEventListener('click', () => openModal(item, 'delete', 'inventory_table'));
      deleteCell.appendChild(deleteButton);
    });
  } catch (e) {
    console.log('There was a problem with the fetch operation: ' + e.message);
  }
}

async function deleteRowinventory_table(id) {
  try {
    const response = await fetch(`dataHandlerwaxinv.php?id=${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    alert('There was a problem with the fetch operation. ' + e.message);
  }
}

window.addEventListener('load', populateTablecandleinv);
window.addEventListener('load', populateTablewaxinv);
window.addEventListener('load', populateTable);