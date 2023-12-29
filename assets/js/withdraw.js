$(document).ready(function () {
  // Get the logged-in kid's email
  const currentUser = getCurrentUser();
  const kidEmail = currentUser.email;
//   const currentParent = currentUser.parentEmail;
  

  // Event delegation event listener for withdraw button
  $(document).on("click", ".modal-submit-button", function () {
    //get value of the withdraw field
    const withdrawValue = $("#withdraw-value-input").val();

    // Get current balance for the kid
    let kidCurrentBalance =
      localStorage.getItem(`balanceTotal_${kidEmail}`) || 0;
    kidCurrentBalance = JSON.parse(kidCurrentBalance);

    kidCurrentBalance = kidCurrentBalance - withdrawValue;

    // Store the updated balance for the kid in local storage
    localStorage.setItem(
      `balanceTotal_${kidEmail}`,
      JSON.stringify(kidCurrentBalance)
    );

    //display message on parents dashboard that kid email has withdrawn funds
    $(".withdrawMessage").text("Your child has withdrawn " + withdrawValue);
  
    //add button "funds paid", that clears message from dashboard
    $(".withdrawMessage").append("<button class='fundsPaidButton'>Funds Paid</button>");

  });
});
