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

    // Show or hide the logout button based on login status
    if (isLoggedIn) {
        $('#logoutBtn').show();
    } else {
        $('#logoutBtn').hide();
    }
}
