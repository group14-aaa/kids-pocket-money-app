$(document).ready(function () {
    // DOM elements
    const $emailInput = $('#email');
    const $passwordInput = $('#password');
    const $confirmPasswordInput = $('#confirmPassword');
    const $userTypeInput = $('input[name="userType"]');
    const $parentEmailInput = $('#parentEmail');
    const $registerBtn = $('#registerBtn');
    const $loginEmailInput = $('#loginEmail');
    const $loginPasswordInput = $('#loginPassword');
    const $loginBtn = $('#loginBtn');

    function isEmailRegistered(email) {
        const existingUsers = getExistingUsers();
        return existingUsers.some(user => user.email === email);
    }

    function validateRegistrationForm(email, password, confirmPassword, userType, parentEmail) {
        if (!email || !password || !confirmPassword) {
            return 'All fields are required.';
        }

        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }

        if (userType === 'kid') {
            if (!parentEmail) {
                return 'Parent\'s email is required for kid registration.';
            }

            const existingUsers = getExistingUsers();
            const isParentEmailRegistered = existingUsers.some(user => user.email === parentEmail);

            if (!isParentEmailRegistered) {
                return 'Parent\'s email is not registered. Please use a different parent\'s email.';
            }
        }

        if (isEmailRegistered(email)) {
            return 'Email is already registered. Please use a different email.';
        }

        return '';
    }

    function validateLoginForm(loginEmail, loginPassword) {
        if (!loginEmail || !loginPassword) {
            return 'Both email and password are required.';
        }
        return '';
    }

    function handleRegistration(event) {
        event.preventDefault();

        const email = $emailInput.val();
        const password = $passwordInput.val();
        const confirmPassword = $confirmPasswordInput.val();
        const userType = $userTypeInput.filter(':checked').val();
        const parentEmail = $parentEmailInput.val();

        const validationError = validateRegistrationForm(email, password, confirmPassword, userType, parentEmail);
        if (validationError) {
            displayErrorMessage('register', validationError);
            return;
        }

        const existingUsers = getExistingUsers();
        existingUsers.push({ email, password, userType, parentEmail });
        setLocalStorageItem('users', existingUsers);

        setLocalStorageItem('isLoggedIn', true);
        setLocalStorageItem('currentUser', { email, userType, parentEmail });
        window.location.href = 'dashboard.html';
    }

    function handleLogin(event) {
        event.preventDefault();

        const loginEmail = $loginEmailInput.val();
        const loginPassword = $loginPasswordInput.val();

        const validationError = validateLoginForm(loginEmail, loginPassword);
        if (validationError) {
            displayErrorMessage('login', validationError);
            return;
        }

        const existingUsers = getExistingUsers();
        const user = existingUsers.find(user => user.email === loginEmail && user.password === loginPassword);

        if (user) {
            setLocalStorageItem('isLoggedIn', true);
            setLocalStorageItem('currentUser', user);
            window.location.href = 'dashboard.html';
        } else {
            displayErrorMessage('login', 'Invalid email or password. Please try again.');
        }
    }

    // Event listeners
    $registerBtn.on('click', handleRegistration);
    $loginBtn.on('click', handleLogin);

    $userTypeInput.on('change', function () {
        $parentEmailInput.toggle($userTypeInput.filter(':checked').val() === 'kid');
    });

    // Initial check on page load
    $('#parentEmailInput').toggle($('#kidRadio').is(':checked'));

    // Toggle when Kid radio is changed
    $(document).on('change', '#kidRadio', function () {
        $('#parentEmailInput').toggle(this.checked);
    });

    // Hide when Parent radio is checked
    $(document).on('change', '#parentRadio', function () {
        $('#parentEmailInput').hide();
    });
});
