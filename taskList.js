$("#task-input").submit(function (event) {
  event.preventDefault();
});

var taskList = $('input[name="task-input"]').val().trim();

// if there's nothing in the form entered, don't print to the page
if (!taskList.length) {
  console.log("No tasks in the list yet!");
  return;
}

// print to the page
taskCardContainer.append(task - input);

// Save the updated taskList to Local Storage;
localStorage.setItem("taskList", JSON.stringify(taskList));

function displayTasks() {
  var taskCardContainer = $("#task-card-container");
  taskCardContainer.text(""); // Clear the existing content

  // Iterate through taskList and append each task to the container
  taskList.forEach(function (task) {
    taskCardContainer.append(createTaskCard(task));
  });
}
