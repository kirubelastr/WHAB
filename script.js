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
        //$('#inventory-product').empty();
        $('#sale-product').empty();
        // Add options dynamically
        candles.forEach(function(candle) {
          //$('#inventory-product').append(`<option value="${candle.name}">${candle.name}</option>`);
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

});
