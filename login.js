document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginCard = document.querySelector('.login-card');
    
    const usernameGroup = document.getElementById('usernameGroup');
    const passwordGroup = document.getElementById('passwordGroup');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    const autofillBtn = document.getElementById('autofillBtn');

    // Demo Credentials
    const DEMO_USERNAME = 'demo@abs.com';
    const DEMO_PASSWORD = 'Demo@123';

    // Form submission handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset previous errors
        resetErrors();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        let isValid = true;
        
        // Validate Username
        if (!username) {
            showError(usernameGroup, usernameError, 'Username is required');
            isValid = false;
        } else if (!validateEmail(username)) {
            showError(usernameGroup, usernameError, 'Please enter a valid email format');
            isValid = false;
        } else if (username !== DEMO_USERNAME) {
            showError(usernameGroup, usernameError, 'Invalid username. Use the demo credentials below.');
            isValid = false;
        }
        
        // Validate Password
        if (!password) {
            showError(passwordGroup, passwordError, 'Password is required');
            isValid = false;
        } else if (password !== DEMO_PASSWORD) {
            showError(passwordGroup, passwordError, 'Incorrect password. Use the demo credentials below.');
            isValid = false;
        }
        
        if (isValid) {
            // Add a successful login button loading animation state
            const submitBtn = loginForm.querySelector('.login-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Authenticating...';
            submitBtn.style.opacity = '0.8';
            
            // Redirect after a brief aesthetic delay for authentication feedback
            setTimeout(() => {
                window.location.href = 'listing.html';
            }, 600);
        } else {
            // Shake the card on failed validation
            loginCard.classList.remove('shake');
            void loginCard.offsetWidth; // Trigger reflow to restart animation
            loginCard.classList.add('shake');
            
            setTimeout(() => {
                loginCard.classList.remove('shake');
            }, 400);
        }
    });

    // Autofill & Log In click handler
    autofillBtn.addEventListener('click', () => {
        resetErrors();
        
        // Visual indicator: fill the fields with typing/fade animation effect
        usernameInput.value = DEMO_USERNAME;
        passwordInput.value = DEMO_PASSWORD;
        
        // Trigger highlight style changes to show the action worked
        highlightInput(usernameInput);
        highlightInput(passwordInput);
        
        // Submit the form automatically after a micro delay for visual confirmation
        setTimeout(() => {
            loginForm.dispatchEvent(new Event('submit'));
        }, 300);
    });

    // Helper functions
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function showError(groupElement, errorElement, message) {
        groupElement.querySelector('.form-input').style.borderColor = 'var(--error-color)';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function resetErrors() {
        usernameInput.style.borderColor = '';
        passwordInput.style.borderColor = '';
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
    }

    function highlightInput(inputElement) {
        inputElement.style.backgroundColor = '#eff6ff';
        inputElement.style.borderColor = 'var(--primary-color)';
        setTimeout(() => {
            inputElement.style.backgroundColor = '';
            inputElement.style.borderColor = '';
        }, 600);
    }
});
