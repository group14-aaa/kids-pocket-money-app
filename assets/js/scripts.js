$(document).ready(function() {
    // Initial check on page load
    $('#parentEmailGroup').toggle($('#kidRadio').is(':checked'));

    // Toggle when Kid radio is changed
    $(document).on('change', '#kidRadio', function() {
      $('#parentEmailGroup').toggle(this.checked);
    });

    // Hide when Parent radio is checked
    $(document).on('change', '#parentRadio', function() {
      $('#parentEmailGroup').hide();
    });
});
