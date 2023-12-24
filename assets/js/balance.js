$(document).ready(function () {
  let balance = 0;
  let balanceField = $("#balance-value");
  const container = $(".container");

  //event delegation event listener for added task button
  container.on("click", ".task-done-button", function () {
    const card = $(this).closest(".col-md-4");
    const taskValue = card.data("task-value");
    calculateBalance(taskValue);
  });

  //calculate balnce and store in local storege
  function calculateBalance(taskValue) {
    taskValue = parseFloat(taskValue);
    balance += taskValue;
    localStorage.setItem("balanceTotal", JSON.stringify(balance));
    displayBalance ();
  }

  // Function to get items from storage and display
  function displayBalance() {
    const userBalance = localStorage.getItem("balanceTotal");

    // Parse the JSON string to convert it into a JavaScript number
    const parsedBalance = JSON.parse(userBalance);


    ///parsed balance is not being added to the balance field text....need to figure why//
    
   // Check if parsedBalance is not empty before setting the text content
   if (parsedBalance !== null) {
    // Convert the parsed balance back to a string before setting it
    balanceField.text(parsedBalance.toString());
  }
}
});
