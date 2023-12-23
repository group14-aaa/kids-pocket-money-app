$(document).ready(function () {
  let balance = 0;
  let balanceField = $("#balance-value");
  const container = $(".container");

  // Check for stored balance on page load
  const storedBalance = localStorage.getItem("balanceTotal");
  if (storedBalance !== null) {
    // If there is a stored balance, set it to the balance variable
    balance = JSON.parse(storedBalance);
    // Display the balance on page load
    displayBalance();
  }

  // event delegation event listener for added task button
  container.on("click", ".task-done-button", function () {
    const card = $(this).closest(".col-md-4");
    const taskValue = card.data("task-value");
    calculateBalance(taskValue);
  });

  // Calculate Balance and store in local storage
  function calculateBalance(taskValue) {
    taskValue = parseFloat(taskValue);
    balance += taskValue;
    localStorage.setItem("balanceTotal", JSON.stringify(balance));
    displayBalance();
  }

  // Function to get items from storage and display
  function displayBalance() {
    // Set the text content of the balanceField with two decimal points
    balanceField.text(balance.toFixed(2));
  }
});
