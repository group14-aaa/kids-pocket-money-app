$(document).ready(function () {
  const container = $(".container");
  const taskForm = $("#task-form");
  const taskNameInput = $("#task-name-input");
  const taskDescriptionInput = $("#task-description-input");
  const taskValueInput = $("#task-value-input");
  const confirmationAlert = $("#confirmation-alert");

  function updateAssociationInfo() {
    const existingUsers = getExistingUsers();
    const currentUser = getCurrentUser();
    const associationList = $('#associationList');

    // Clear previous association information
    associationList.empty();

    // Get parent-kid association
    if (currentUser.userType === 'parent' && currentUser.parentEmail === '') {
      const parentEmail = currentUser.email;
      const associatedKids = existingUsers.filter(kid => kid.parentEmail === parentEmail);

      if (associatedKids.length === 0) {
        const noKidsAvailable = `<h4 class="text-center">No kids available<h3/>`
        associationList.append(noKidsAvailable);
      }

      if (associatedKids.length > 0) {
        // Iterate through associatedKids and create child checkboxes
        associatedKids.forEach(kid => {
          const kidCheckbox = `<div class="form-check">
                                  <input class="form-check-input" type="checkbox" id="${kid.email}">
                                  <label class="form-check-label" for="${kid.email}">
                                    ${kid.email}
                                  </label>
                                </div>`;
          associationList.append(kidCheckbox);
        });
      }
    }
  }

  function generateTaskId() {
    return "task-" + Date.now();
  }

  function saveTask(taskId, task) {
    setLocalStorageItem(taskId, task);

    // Assign the task to each selected kid
    task.assignedKids.forEach(kidEmail => {
      const kidTasks = getLocalStorageItem(kidEmail, []);
      kidTasks.push(taskId);
      setLocalStorageItem(kidEmail, kidTasks)
    });
  }

  // Event listener for submit button. Save values to local storage
  container.on("click", ".task-submit-button", function (event) {
    event.preventDefault();

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

    // Get selected kids for task assignment
    const selectedKids = getSelectedKids();

    // Check if at least one kid is selected
    if (selectedKids.length === 0) {
      displayErrorMessage("task-modal", "Please select at least one kid for the task.");
      return;
    }

    // Proceed with saving the task if all validations pass
    const taskId = generateTaskId();
    const currentTime = dayjs();
    const enteredTask = {
      id: taskId,
      date: currentTime.format(),
      name: taskName,
      description: taskDescriptionInput.val(),
      // Convert to float or default to 0
      value: taskValue || 0,
      // Store assigned kids' emails
      assignedKids: selectedKids.map(kid => kid.email),
    };

    saveTask(taskId, enteredTask);

    // Show confirmation message
    displayConfirmationMessage(confirmationAlert, "Task added successfully!");

    displayActiveTasksForParent();

    // Clear form inputs after submission
    taskForm[0].reset();
  });

  // Function to get selected kids for task assignment
  function getSelectedKids() {
    return $('#associationList input:checked').map(function () {
      return getUserByEmail($(this).attr('id'));
    }).get();
  }

  // Function to get a user by email from local storage
  function getUserByEmail(email) {
    const users = getExistingUsers();
    return users.find(user => user.email === email) || {};
  }

  // Clear form inputs when the modal is opened
  $("#task-modal").on("shown.bs.modal", function () {
    taskForm[0].reset();
    // Update parent/kid association info when the modal is opened
    updateAssociationInfo();
  });

  // Clear form inputs when the modal is closed
  $("#task-modal").on("hidden.bs.modal", function () {
    taskForm[0].reset();
  });

  function displayActiveTasksForParent() {
    const currentUser = getCurrentUser();
    const taskContainerParent = $("#task-card-container-parent");

    // Clear previous tasks
    taskContainerParent.empty();

    if (currentUser.userType === 'parent') {
      const associatedKids = getExistingUsers().filter(kid => kid.parentEmail === currentUser.email);

      let allTasks = [];

      associatedKids.forEach(kid => {
        const kidTasks = getLocalStorageItem(kid.email, []);
        const kidHistoryTasks = getLocalStorageItem(`taskHistory_${kid.email}`, []);

        // Filter tasks that are not in the kid's history
        const filteredKidTasks = kidTasks.filter(taskId => {
          // Check if the taskId exists in kidHistoryTasks
          return !kidHistoryTasks.some(historyItem => historyItem.taskId === taskId);
        });

        filteredKidTasks.forEach(taskId => {
          const task = getLocalStorageItem(taskId);

          if (task) {
            allTasks.push({
              kidEmail: kid.email,
              taskName: task.name,
              taskValue: task.value.toFixed(2),
              date: task.date
            });
          }
        });
      });

      // Sort tasks by date in descending order
      allTasks.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Append sorted tasks to the container
      allTasks.forEach(task => {
        const formattedDateTime = dayjs(task.date).format('MMMM D, YYYY - h:mm A');

        const taskInfo = `
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-3"><strong>Kid Email:</strong> ${task.kidEmail}</div>
                        <div class="col-md-3"><strong>Task Name:</strong> ${task.taskName}</div>
                        <div class="col-md-3"><strong>Task Value:</strong> £${task.taskValue}</div>
                        <div class="col-md-3"><strong>Added Date:</strong> ${formattedDateTime}</div>
                    </div>
                </li>
            `;
        taskContainerParent.append(taskInfo);
      });

      // Check if there are no tasks and display a message
      if (taskContainerParent.children().length === 0) {
        const noTaskMessage = `
                <div class="col-12 text-center mt-3">
                    <p>No active tasks available</p>
                </div>
            `;
        taskContainerParent.append(noTaskMessage);
      }
    }
  }

  displayActiveTasksForParent();

});
