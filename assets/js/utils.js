// Check if the user is logged and redirect
function checkLoginStatusAndRedirect(userType) {
    const isLoggedIn = getLocalStorageItem('isLoggedIn', false);
    const currentUser = getCurrentUser();

    if (!isLoggedIn) {
        // User is not logged in, redirect to index.html
        redirectTo('index.html');
    } else if (currentUser.userType === userType) {
        // User is logged in and has the correct user type
        displayUserSpecificContent(userType);
    } else {
        // Redirect to appropriate dashboard for unauthorized access
        redirectTo(userType === 'parent' ? 'kid_dashboard.html' : 'parent_dashboard.html');
    }
}

function redirectToDashboard(userType) {
    if (getLocalStorageItem('isLoggedIn', false)) {
        // User is already logged in, redirect to the dashboard
        redirectTo(userType === 'parent' ? 'parent_dashboard.html' : 'kid_dashboard.html');
    }
}

// Log out the user
function handleLogout() {
    setLocalStorageItem('isLoggedIn', false);
    removeLocalStorageItem('currentUser');
    redirectTo('index.html');
}

function checkLoginStatus() {
    const isLoggedIn = getLocalStorageItem('isLoggedIn', false);
    const buttons = ['.navbar-nav button[data-bs-target="#login"]', '.navbar-nav button[data-bs-target="#register"]', '#hero-intro button[data-bs-target="#register"]'];

    // Show or hide elements based on login status
    buttons.forEach(button => $(button).toggle(!isLoggedIn));

    $('#logoutBtn, #tasksBtn').toggle(isLoggedIn);
}

// Display error messages in the specified modal
function displayErrorMessage(modalId, message) {
    const errorMessageElement = $(`#${modalId} .error-message`);
    errorMessageElement.text(message);

    // Hide the error message after a few seconds
    setTimeout(() => errorMessageElement.text(''), 3000);
}

// Display confirmation messages
function displayConfirmationMessage(alertElement, message) {
    alertElement.text(message).show();

    // Hide the confirmation message after a few seconds
    setTimeout(() => alertElement.hide(), 5000);
}

function getExistingUsers() {
    return getLocalStorageItem('users', []);
}

function getCurrentUser() {
    return getLocalStorageItem('currentUser', {});
}

// Helper functions
function getLocalStorageItem(key, defaultValue) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
}

function redirectTo(url) {
    window.location.href = url;
}

function displayUserSpecificContent(userType) {
    $('#content').html(`<p>Hello ${userType === 'parent' ? 'Parent' : 'Kid'}</p>`);
    $('#logoutBtn').show();
}
