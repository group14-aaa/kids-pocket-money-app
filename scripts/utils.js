// Check if the user is logged and redirect
function checkLoginStatusAndRedirect(userType) {
    const isLoggedIn = getLocalStorageItem('isLoggedIn', false);

    if (!isLoggedIn) {
        // User is not logged in, redirect to index.html
        redirectTo('index.html');
    } else if (userType === 'parent' || userType === 'kid') {
        // User is logged in and has the correct user type
        displayUserSpecificContent(userType);
    } else {
        redirectTo('index.html');
    }
}

// Display content based on user type
function displayUserSpecificContent(userType) {
    if (userType === 'parent') {
        $('.header-balance').remove();
        $('.content-kid').remove();
        $('.content-parent').show();
    } else if (userType === 'kid') {
        $('.content-parent').remove();
        $('.content-kid').show();
        $('.header-balance').show();
    }
    $('#logoutBtn').show();
}

// Display UI elements based on Login Status
function updateUIBasedOnLoginStatus() {
    const isLoggedIn = getLocalStorageItem('isLoggedIn', false);
    const buttons = ['.navbar-nav button[data-bs-target="#login"]', '.navbar-nav button[data-bs-target="#register"]', '#hero-intro button[data-bs-target="#register"]'];

    // Show or hide elements based on login status
    buttons.forEach(button => $(button).toggle(!isLoggedIn));

    $('#logoutBtn, #tasksBtn').toggle(isLoggedIn);
}

// Log out the user
function handleLogout() {
    setLocalStorageItem('isLoggedIn', false);
    removeLocalStorageItem('currentUser');
    redirectTo('index.html');
}

// Display error messages in the specified modal
function displayErrorMessage(modalId, message) {
    const errorMessageElement = $(`#${modalId} .error-message`);
    errorMessageElement.text(message);

    // Hide the error message after a few seconds
    setTimeout(() => errorMessageElement.text(''), 2000);
}

// Display confirmation messages
function displayConfirmationMessage(alertElement, message) {
    alertElement.text(message).show();

    // Hide the confirmation message after a few seconds
    setTimeout(() => alertElement.hide(), 2000);
}

// Displaying the date
function displayDate() {
    const now = dayjs();
    const formattedTime = now.format("dddd, MMMM D");
    $("#display-day").text(formattedTime);
}

//-- Helper functions --//
function getExistingUsers() {
    return getLocalStorageItem('users', []);
}

function getCurrentUser() {
    return getLocalStorageItem('currentUser', {});
}

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
