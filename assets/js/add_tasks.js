$(document).ready(function () {
  const container = $(".container");
  const taskNameInput = $("#task-name-input");
  const taskDescriptionInput = $("#task-description-input");
  const taskValueInput = $("#task-value-input");

  // Event listener for submit button. Save values to local storage
  container.on("click", ".task-submit-button", function () {
    // Clear previous error messages
    $(".error-message").text("");

    // Validate task name
    const taskName = taskNameInput.val();
    if (!taskName) {
      displayErrorMessage("task-modal", "Please enter a task name.");
      return;
    }

    // Validate task value
    const taskValue = parseFloat(taskValueInput.val());
    if (isNaN(taskValue) || taskValue < 0) {
      displayErrorMessage("task-modal", "Please enter a valid task value.");
      return;
    }

    // Proceed with saving the task if all validations pass
    const taskId = generateTaskId();
    const currentTime = dayjs();
    const enteredTask = {
      id: taskId,
      date: currentTime.format(), // Store date as part of the task
      name: taskName,
      description: taskDescriptionInput.val(),
      value: taskValue || 0, // Convert to float or default to 0
    };

    saveTask(taskId, enteredTask);
    loadTasksToPage();
  });

  // Generate a unique task ID
  function generateTaskId() {
    return "task-" + Date.now();
  }

  // (key = taskId, value = entered task values)
  function saveTask(taskId, task) {
    localStorage.setItem(taskId, JSON.stringify(task));
  }

});
