// scripts.js
//toggle visibility of parent's email field
$(document).ready(function() {
    // Initial check on page load
    $('#parentEmailGroup').toggle($('#kidRadio').is(':checked'));

    // Toggle when Kid radio is changed
    $('#kidRadio').change(function() {
      $('#parentEmailGroup').toggle(this.checked);
    });

    // Hide when Parent radio is checked
    $('#parentRadio').change(function() {
      $('#parentEmailGroup').hide();
    });
  });
