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
  
  // Handle form submission for adding stock
  $('#stock-form').submit(function(e) {
    e.preventDefault();
    var candleName = $('#stock-product').val();
    var quantity = $('#stock-quantity').val();
    
    // Display confirmation popup
    var confirmed = confirm(`Are you sure you want to add ${quantity} units of ${candleName} to stock?`);
    
    if (confirmed) {
      // Perform AJAX call to add stock
      $.ajax({
        url: 'add_stock.php',
        method: 'POST',
        data: { candleName: candleName, quantity: quantity },
        success: function(response) {
          alert(response); // Alert success message
        },
        error: function(xhr, status, error) {
          console.error(error);
          alert('Error adding stock. Please try again later.'); // Alert error message
        }
      });
    } else {
      alert('Stock addition canceled. Please review the details and try again.'); // Alert the cancellation
    }
  });