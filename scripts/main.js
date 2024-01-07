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

  // Check if seed balances for kids are already set, if not, set them
  if (!getLocalStorageItem('balanceSeedSet')) {
    setSeedBalanceForKids();
    setLocalStorageItem('balanceSeedSet', true);
  }

  // Check if seed withdrawals are already set, if not, set them
  if (!getLocalStorageItem('withdrawSeedSet')) {
    setSeedWithdrawTransaction();
    setLocalStorageItem('withdrawSeedSet', true);
  }

  // Update UI
  updateUIBasedOnLoginStatus();

  // Event listener to handle the collapse events in dashboard
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
