$(document).ready(function () {

    // function updateAssociationInfo() {
    //     const existingUsers = getExistingUsers();
    //     const associationList = $('#associationList');

    //     // Clear previous association information
    //     associationList.empty();

    //     // Display parent-kid association
    //     existingUsers.forEach(function (user) {
    //         if (user.userType === 'parent' && user.parentEmail === '') {
    //             const parentEmail = user.email;
    //             const associatedKids = existingUsers.filter(kid => kid.parentEmail === parentEmail);

    //             if (associatedKids.length > 0) {
    //                 const kidEmails = associatedKids.map(kid => `<strong>${kid.email}</strong>`);
    //                 associationList.append(`<li><strong>${parentEmail}</strong> is associated with: ${kidEmails.join(', ')}</li>`);
    //             }
    //         }
    //     });
    // }

    function isEmailRegistered(email) {
        const existingUsers = getExistingUsers();
        return existingUsers.some(function (user) {
            return user.email === email;
        });
    }

    function validateRegistrationForm(email, password, confirmPassword, userType, parentEmail) {
        if (!email || !password || !confirmPassword) {
            return 'All fields are required.';
        }

        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }

        if (userType === 'kid' && !parentEmail) {
            return 'Parent\'s email is required for kid registration.';
        }

        if (isEmailRegistered(email)) {
            return 'Email is already registered. Please use a different email.';
        }

        return '';
    }

    $('#registerBtn').on('click', function (event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const userType = $('input[name="userType"]:checked').val();
        const parentEmail = $('#parentEmail').val();

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
        window.location.href = 'redirectToDashboard.html';
    });

    function validateLoginForm(loginEmail, loginPassword) {
        if (!loginEmail || !loginPassword) {
            return 'Both email and password are required.';
        }
        return '';
    }

    $('#loginBtn').on('click', function (event) {
        event.preventDefault();

        const loginEmail = $('#loginEmail').val();
        const loginPassword = $('#loginPassword').val();

        const validationError = validateLoginForm(loginEmail, loginPassword);
        if (validationError) {
            displayErrorMessage('login', validationError);
            return;
        }

        const existingUsers = getExistingUsers();
        const user = existingUsers.find(function (user) {
            return user.email === loginEmail && user.password === loginPassword;
        });

        if (user) {
            setLocalStorageItem('isLoggedIn', true)
            setLocalStorageItem('currentUser', user)
            window.location.href = 'redirectToDashboard.html';
        } else {
            displayErrorMessage('login', 'Invalid email or password. Please try again.');
        }
    });

    $('input[name="userType"]').on('change', function () {
        $('#parentEmailInput').toggle($(this).val() === 'kid');
    });

    // updateAssociationInfo();
});
