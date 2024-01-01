$(document).ready(function () {
    // Initially hide the content
    $('.content').hide();

    // Determine the user type
    const userType = getCurrentUser().userType;
    checkLoginStatusAndRedirect(userType);

    // Display the content after checking login status
    $('.content').show();
});
