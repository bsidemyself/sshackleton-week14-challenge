async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('./dashboard');
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
};

async function signupFormHandler(event) {
    event.preventDefault();

    const user = document.querySelector('#user-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (user && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                user, email, password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            alert('Account created! You are now logged in');
            document.location.replace('/dashboard');        
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);