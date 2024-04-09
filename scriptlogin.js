document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Send data to server for authentication
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.responseText);
            showAlert(response.message, response.type);
            if (response.success) {
              // Wait for 2 seconds before redirecting to home.html
              setTimeout(function() {
                window.location.href = 'home.html';
              }, 2000);
            }
          } catch (error) {
            showAlert('Error: Invalid response from server. Please make sure the server is running.', 'error');
          }
        } else if (xhr.status === 0) {
          showAlert('Error: Server is not active. Please start the server.', 'error');
        } else {
          showAlert('Error: Server response status ' + xhr.status, 'error');
        }
      }
    };
    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
  });
  
  function showAlert(message, type) {
    var alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
  }
  
  