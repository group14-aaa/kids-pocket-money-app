var taskList = $('input[name="task-input"]').val();

// if there's nothing in the form entered, don't print to the page
if (!taskList) {
  console.log("No task list yet!");
  return;
}

// print to the page
taskList.append("<li>" + task - input + "</li>");
