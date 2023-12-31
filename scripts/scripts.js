$(document).ready(function () {
  // Initial check on page load
  $('#parentEmailInput').toggle($('#kidRadio').is(':checked'));

  // Toggle when Kid radio is changed
  $(document).on('change', '#kidRadio', function () {
      $('#parentEmailInput').toggle(this.checked);
  });

  // Hide when Parent radio is checked
  $(document).on('change', '#parentRadio', function () {
      $('#parentEmailInput').hide();
  });

  displayDate();

  checkLoginStatus();
  $('#logoutBtn').on('click', handleLogout);
});
