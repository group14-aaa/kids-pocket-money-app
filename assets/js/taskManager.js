// $(document).ready(function () {
//   const container = $('.container');
//   const taskNameInput = $('#task-name-input');
//   const taskDescriptionInput = $('#task-description-input');
//   const taskValueInput = $('#task-value-input');

//   // Event listener for submit button. Save values to local storage
//   container.on('click', '.task-submit-button', function () {
//     const taskId = generateTaskId();
//     const currentTime = dayjs();
//     const enteredTask = {
//       id: taskId,
//       date: currentTime.format(), // Store date as part of the task
//       name: taskNameInput.val(),
//       description: taskDescriptionInput.val(),
//       value: taskValueInput.val()
//     };

//     saveTask(taskId, enteredTask);
//     loadTasksToPage();
//   });

//   // Generate a unique task ID
//   function generateTaskId() {
//     return 'task-' + Date.now();
//   }

//   // (key = taskId, value = entered task values)
//   function saveTask(taskId, task) {
//     localStorage.setItem(taskId, JSON.stringify(task));
//   }

//   // Load tasks to the page using Bootstrap cards
//   function loadTasksToPage() {
//     const tasks = getTasksFromLocalStorage();
//     const taskCardContainer = $('#task-card-container');

//     // Clear existing cards
//     taskCardContainer.empty();

//     // Check if there are tasks available
//     if (tasks.length === 0) {
//       // Display a message when no tasks are available
//       const noTaskMessage = `
//           <div class="col-12 text-center mt-3">
//               <p>No tasks available</p>
//           </div>
//       `;
//       taskCardContainer.append(noTaskMessage);
//     } else {
//       // Sort tasks in reverse order (newest first)
//       tasks.sort((a, b) => new Date(b.date) - new Date(a.date));

//       // Loop to create Bootstrap cards for each task
//       tasks.forEach(function (task, i) {
//         // Check if task properties exist before displaying
//         const card = `
//               <div class="col-md-4 mb-4">
//                   <div class="card">
//                       <div class="card-body">
//                           <h5 class="card-title">${task.name || 'N/A'}</h5>
//                           <p class="card-text">${task.description || 'N/A'}</p>
//                           <p class="card-text">Value: £${task.value || 'N/A'}</p>
//                           <button type="submit" class="btn btn-primary task-done-button">Done</button>
//                           <button class="btn-secondary task-not-complete-btn">Not Done</button>
//                       </div>
//                   </div>
//               </div>
//           `;
//         taskCardContainer.append(card);
//       });
//     }
//   }

//   // Load tasks to the page on initial page load
//   loadTasksToPage();
// });

// // Load tasks to the table in kids dashboard
// function getTasksFromLocalStorage() {
//   const tasks = [];

//   // Iterate through all localStorage keys
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const task = JSON.parse(localStorage.getItem(key));
//     tasks.push(task);
//   }

//   return tasks;


//   //remove task from page view 
//   //add value of task to local storage and add to balance
//   //remove task from local storage


// //event delegation event listner   NOT WORKING
// container.on('click', '.task-done-button', function () {

//     console.log("button pressed");

//     // const card = $(this).closest('.card');
//     //   const taskValue = card.find('.task.value').val();
//     // console.log("Task Value:", taskValue);

//     });




// }
