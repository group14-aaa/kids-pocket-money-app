$(document).ready(function () {
    // Display Date
    // displayDate();

    // Update UI
    updateUIBasedOnLoginStatus();

    // Add an event listener to handle the collapse events
    $('.toggle-button').on('click', function () {
        const targetCollapseId = $(this).data('target');
        const allCollapses = $('.multi-collapse');

        // Hide all collapses
        allCollapses.each(function () {
          if ($(this).attr('id') !== targetCollapseId) {
            $(this).collapse('hide');
          }
        });
      });

    // Log out button
    $('#logoutBtn').on('click', handleLogout);
});
