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

  // handle displaying the date
  function displayDate() {
      setInterval(() => {
          //get current time
          const now = dayjs();
          //format the time
          const formattedTime = now.format("dddd, MMMM D");
          //text field displays formatted time
          $("#display-Day").text(formattedTime);
      }, 1000);
  }

  checkLoginStatus();
  $('#logoutBtn').on('click', handleLogout);
});
