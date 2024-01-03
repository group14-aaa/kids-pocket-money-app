function displayTaskHistory() {
    const currentUser = getCurrentUser();
    const taskHistoryContainer = $("#task-history-table");
    const kidsTaskHistoryContainer = $("#task-kids-history-table")

    // Clear previous task history
    taskHistoryContainer.empty();

    const isParent = currentUser.userType === 'parent';

    let allTasks = [];

    if (isParent) {
        const associatedKids = getExistingUsers().filter(kid => kid.parentEmail === currentUser.email);

        associatedKids.forEach(kid => {
            const kidTasks = getLocalStorageItem(`taskHistory_${kid.email}`, []);

            kidTasks.forEach(task => {
                // Retrieve task details using taskId
                const taskDetails = getLocalStorageItem(task.taskId);
                if (taskDetails) {
                    allTasks.push({
                        kidEmail: kid.email,
                        taskName: taskDetails.name,
                        taskValue: taskDetails.value.toFixed(2),
                        dateTime: task.dateTime
                    });
                }
            });
        });
    } else {
        const taskHistoryKey = `taskHistory_${currentUser.email}`;
        const userTaskHistory = getLocalStorageItem(taskHistoryKey, []);

        userTaskHistory.forEach(task => {
            // Retrieve task details using taskId
            const taskDetails = getLocalStorageItem(task.taskId);
            if (taskDetails) {
                allTasks.push({
                    taskName: taskDetails.name,
                    taskValue: taskDetails.value.toFixed(2),
                    dateTime: task.dateTime
                });
            }
        });
    }

    // Sort tasks by date and time in descending order
    allTasks.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));


    // Append sorted tasks to the container
    allTasks.forEach(task => {
        const taskInfo = `
            <tr class="table-success">
                    ${isParent ? `<td colspan="2"> ${task.kidEmail}</td>` : ''}
                    <td colspan="2"> ${task.taskName}</td>
                    <td colspan="2"> £${task.taskValue}</td>
                    <td colspan="2"> ${dayjs(task.dateTime).format('MMMM D, YYYY - h:mm A')}</td>
            </tr>
        `;
        taskHistoryContainer.append(taskInfo);
        kidsTaskHistoryContainer.append(taskInfo)

    });

    // Check if there are no tasks and display a message
    if (taskHistoryContainer.children().length === 0) {
        const noTaskMessage = `
            <div class="col-12 text-center mt-3">
                <p>No tasks available in history</p>
            </div>
        `;
        taskHistoryContainer.append(noTaskMessage);
    }
}
