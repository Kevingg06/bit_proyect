
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    fetch('http://localhost:5500/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Token stored in local storage');
        console.log('Token received:', data.token);
      } else {
        console.log('Inicio de sesion fallido');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });