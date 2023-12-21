console.log('Signup')

document.querySelector('#signup-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name,email,password }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(data => {
      console.log(data)
      if (data.success) {
        window.location.href = '/'; // Redirect to homepage
      } else {
        console.error('Error:', data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });