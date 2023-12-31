$(document).ready(function () {
    // Initially hide the content
    $('.content').hide();

    $('#logoutBtn').on('click', handleLogout);

    // Determine the user type based on the current page
    const userType = window.location.pathname.includes('parent_dashboard') ? 'parent' : 'kid';

    checkLoginStatusAndRedirect(userType);

    // Display the content after checking login status
    $('.content').show();
});
