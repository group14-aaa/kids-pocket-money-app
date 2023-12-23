function checkLoginStatusAndRedirect(userType) {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

    if (!isLoggedIn) {
        // User is not logged in, redirect to index.html
        window.location.href = 'index.html';
    } else {
        // User is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser.userType === userType) {
            // Show specific content based on user type
            $('#content').html(`<p>Hello ${userType === 'parent' ? 'Parent' : 'Kid'}</p>`);

            // Show the logout button
            $('#logoutBtn').show();
        } else {
            // Redirect to index.html for unauthorized access
            window.location.href = userType === 'parent' ? 'kid_dashboard.html' : 'parent_dashboard.html';
        }
    }
}

function redirectToDashboard(userType) {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

    // Check if the user is already logged in
    if (isLoggedIn) {
        window.location.href = userType === 'parent' ? 'parent_dashboard.html' : 'kid_dashboard.html';
    }
}

function handleLogout() {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function checkLoginStatus() {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

    // Select the login and register buttons
    const loginButton = $('.navbar-nav button[data-bs-target="#login"]');
    const registerButton = $('.navbar-nav button[data-bs-target="#register"]');

    // Show or hide the logout button based on login status
    if (isLoggedIn) {
        // User is logged in, hide login and register buttons
        loginButton.hide();
        registerButton.hide();
        $('#logoutBtn').show();
        $('#tasksBtn').show();
    } else {
        // User is not logged in, show login and register buttons
        loginButton.show();
        registerButton.show();
        $('#logoutBtn').hide();
        $('#tasksBtn').hide();
    }
}

// Display error messages in the specified modal
function displayErrorMessage(modalId, message) {
    const errorMessageElement = $(`#${modalId} .error-message`);
    errorMessageElement.text(message);

    // Hide the error message after a few seconds
    setTimeout(function () {
        errorMessageElement.text(""); // Clear the message
    }, 3000); // display time
}

// Display confirmation messages
function displayConfirmationMessage(alertElement, message) {
    alertElement.text(message);
    alertElement.show();

    // Hide the confirmation message after a few seconds
    setTimeout(function () {
        alertElement.hide();
    }, 5000); // display time
}

function getExistingUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || {};
}
