document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace this with your login authentication logic
  if (username === 'admin' && password === 'password') {
    // Successful login
    showMessage('Login successful', 'green');
  } else {
    // Failed login
    showMessage('Invalid username or password', 'red');
  }
});

function showMessage(message, color) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.style.color = color;
}
