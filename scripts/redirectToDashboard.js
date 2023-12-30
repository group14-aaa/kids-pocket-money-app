$(document).ready(function () {
    const currentUser = getCurrentUser();
    redirectToDashboard(currentUser.userType);
});
