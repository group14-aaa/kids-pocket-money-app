$(document).ready(function () {
  const container = $(".container");
  const taskNameInput = $("#task-name-input");
  const taskDescriptionInput = $("#task-description-input");
  const taskValueInput = $("#task-value-input");

  // Event listener for submit button. Save values to local storage
  container.on("click", ".task-submit-button", function () {
    const taskId = generateTaskId();
    const currentTime = dayjs();
    const enteredTask = {
      id: taskId,
      date: currentTime.format(), // Store date as part of the task
      name: taskNameInput.val(),
      description: taskDescriptionInput.val(),
      value: taskValueInput.val(),
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
