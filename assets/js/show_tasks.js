$(document).ready(function () {

    const container = $('.container');
  
    // Load tasks to the page using Bootstrap cards
    function loadTasksToPage() {
      const tasks = getTasksFromLocalStorage();
      const taskCardContainer = $('#task-card-container');
  
      // Clear existing cards
      taskCardContainer.empty();
  
      // Check if there are tasks available
      if (tasks.length === 0) {
        // Display a message when no tasks are available
        const noTaskMessage = `
            <div class="col-12 text-center mt-3">
                <p>No tasks available</p>
            </div>
        `;
        taskCardContainer.append(noTaskMessage);
      } else {
        // Sort tasks in reverse order (newest first)
        tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        // Loop to create Bootstrap cards for each task
        tasks.forEach(function (task, i) {
          // Check if task properties exist before displaying
          //added data value to grab for calculations
          const card = `
                <div class="col-md-4 mb-4" data-task-value="${task.value}">
                      <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${task.name || 'N/A'}</h5>
                            <p class="card-text">${task.description || 'N/A'}</p>
                            <p class="card-text">Value: £${task.value || 'N/A'}</p>
                            <button type="submit" class="btn btn-primary task-done-button">Done</button>
                            <button class="btn-secondary task-not-complete-btn">Not Done</button>
                        </div>
                    </div>
                </div>
            `;
          taskCardContainer.append(card);
        });
      }
    }
  
    // Load tasks to the page on initial page load
    loadTasksToPage();
  
  
    // Load tasks to the table in kids dashboard
    function getTasksFromLocalStorage() {
      const tasks = [];
  
      // Iterate through all localStorage keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const task = JSON.parse(localStorage.getItem(key));
        tasks.push(task);
      }
  
      return tasks;
    }
  
    //event delegation event listener for added task button  
    container.on('click', '.task-done-button', function () {
      const card = $(this).closest('.card');
      const taskValue = card.data('task-value');
      console.log(taskValue);
    });
  
  });
  