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