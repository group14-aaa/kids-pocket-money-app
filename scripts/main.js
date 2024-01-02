$(document).ready(function () {
    // Display Date
    displayDate();

    // Update UI
    updateUIBasedOnLoginStatus();

    // Log out button
    $('#logoutBtn').on('click', handleLogout);
});
