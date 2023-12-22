$(document).ready(function() {
    const container = $('.container');
    const taskNameInput = $('#task-name-input');
    const taskDescriptionInput = $('#task-description-input');
    const taskValueInput = $('#task-value-input');

    // Event listener for submit button. Save values to local storage
    container.on('click', '.task-submit-button', function() {
        const currentTime = dayjs();
        const enteredTask = {
            name: taskNameInput.val(),
            description: taskDescriptionInput.val(),
            value: taskValueInput.val()
        };

        saveTask(currentTime, enteredTask);
        loadTasksToTable(currentTime);
    });


    //(key = currentTime, value = entered task values)
    function saveTask(key, task) {
        localStorage.setItem(key, JSON.stringify(task));
    }
});

// Load tasks to the table in kids dashboard

function getTasksFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];

}

function loadTasksToTable(currentTime) {
  const tasks = getTasksFromLocalStorage(currentTime.format());
  const tableBody = $('#task-table-body');

  // Clear existing rows
  tableBody.empty();

  // loop Populate the table with tasks
  tasks.forEach(function (task, i) {
    const row = `
      <tr>
        <th scope="row">${[i] + 1}</th>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>£${task.value}</td>
      </tr>
    `;
    tableBody.append(row);
  });
 
}