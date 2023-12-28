$(document).ready(function () {
  let kidBalance = 0;
  let balanceField = $("#balance-value");
  const container = $(".container");

  // Get the logged-in kid's email
  const currentUser = getCurrentUser();
  const kidEmail = currentUser.email;

  // Check for stored balance on page load
  const storedBalance = localStorage.getItem(`balanceTotal_${kidEmail}`);
  if (storedBalance !== null) {
    // If there is a stored balance, set it to the balance variable
    kidBalance = JSON.parse(storedBalance);
    // Display the balance on page load
    displayBalance();
  }

  // Event delegation event listener for added task button
  container.on("click", ".task-done-button", function () {
    const card = $(this).closest(".col-md-4");
    const taskValue = card.data("task-value");

    // Calculate the balance for the kid and store in local storage
    calculateBalance(taskValue, kidEmail);

    // Remove the task from the list and move it to task history
    moveTaskToHistory(card);
  });

  function moveTaskToHistory(card) {
    // Get the task ID from the card
    const taskId = card.find(".task-done-button").data("task-id");

    // Get the logged-in kid's email
    const currentUser = getCurrentUser();
    const kidEmail = currentUser.email;

    // Remove the task from local storage
    const tasks = JSON.parse(localStorage.getItem(taskId)) || [];
    const remainingAssignedKids = tasks.assignedKids.filter(kid => kid !== kidEmail);

    if (remainingAssignedKids.length === 0) {
      // Remove the task from local storage if no other kids are assigned
      localStorage.removeItem(taskId);
    } else {
      // Update the task with remaining assigned kids
      tasks.assignedKids = remainingAssignedKids;
      localStorage.setItem(taskId, JSON.stringify(tasks));
    }

    // Add the task to task history for the kid
    const userTaskHistory = JSON.parse(localStorage.getItem(`taskHistory_${kidEmail}`)) || [];
    userTaskHistory.push(taskId);
    localStorage.setItem(`taskHistory_${kidEmail}`, JSON.stringify(userTaskHistory));

    // Reload tasks on the page
    loadTasksToPage();
  }

  // Calculate Balance and store in local storage for each kid
  function calculateBalance(taskValue, kidEmail) {
    taskValue = parseFloat(taskValue);

    // Get current balance for the kid
    let kidCurrentBalance = localStorage.getItem(`balanceTotal_${kidEmail}`) || 0;
    kidCurrentBalance = JSON.parse(kidCurrentBalance);

    // Update the balance for the kid
    kidCurrentBalance += taskValue;

    // Store the updated balance for the kid in local storage
    localStorage.setItem(`balanceTotal_${kidEmail}`, JSON.stringify(kidCurrentBalance));

    // Update the global kidBalance variable
    kidBalance = kidCurrentBalance;

    // Display the balance for the kid
    displayBalance();
  }

  // Function to get items from storage and display
  function displayBalance() {
    // Set the text content of the balanceField with two decimal points
    balanceField.text(kidBalance.toFixed(2));
  }

 
});
