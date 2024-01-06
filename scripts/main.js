$(document).ready(function () {
  // Display Date
  // displayDate();

  // Check if seed data is already set, if not, set it
  if (!getLocalStorageItem('users')) {
    setSeedUserData();
  }

  // Check if seed tasks for kids are already set, if not, set them
  if (!getLocalStorageItem('taskSeedSet')) {
    setSeedTasksForKids();
    setLocalStorageItem('taskSeedSet', true);
  }

  // Check if seed tasks for kids are already set, if not, set them
  if (!getLocalStorageItem('balanceSeedSet')) {
    setSeedBalanceForKids();
    setLocalStorageItem('balanceSeedSet', true);
  }


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
