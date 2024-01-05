// Set seed data in local storage
function setSeedUserData() {
    const seedUsers = [
        {
            email: 'parent@gmail.com',
            password: 'parent',
            userType: 'parent',
            parentEmail: ''
        },
        {
            email: 'kid1@gmail.com',
            password: 'kid1',
            userType: 'kid',
            parentEmail: 'parent@gmail.com'
        },
        {
            email: 'kid2@gmail.com',
            password: 'kid2',
            userType: 'kid',
            parentEmail: 'parent@gmail.com'
        }
    ];

    setLocalStorageItem('users', seedUsers);
    setLocalStorageItem('isLoggedIn', false);
}

// Set seed tasks for kids
function setSeedTasksForKids() {

    const addSeedTasks = [
        {
            kidEmail: 'kid1@gmail.com',
            taskId: ['task-2'],
        },
        {
            kidEmail: 'kid2@gmail.com',
            taskId: ['task-2'],
        }
    ];

    addSeedTasks.forEach(kidTask => {
        setLocalStorageItem(kidTask.kidEmail, kidTask.taskId)
    });


    const seedTasks = [
        {
            id: 'task-1',
            date: dayjs().subtract(7, 'day').format(),
            name: 'History, Seed Task 1',
            description: 'This is seed task for kid 1',
            value: 5.00,
            // no kids assigned
            assignedKids: []
        },
        {
            id: 'task-2',
            date: dayjs().subtract(5, 'day').format(),
            name: 'Active task, Seed Task 2',
            description: 'This is task 2',
            value: 5.00,
            // 2 kids assigned
            assignedKids: ['kid2@gmail.com', 'kid1@gmail.com']
        },
    ];

    seedTasks.forEach(activeTask => {
        setLocalStorageItem(activeTask.id, activeTask)
    });


    const seedTasksKey = [
        {
            email: 'kid1@gmail.com',

        },
        {
            email: 'kid2@gmail.com',

        }
    ];

    seedTasksKey.forEach(kid => {
        const taskHistoryKey = `taskHistory_${kid.email}`;
        const taskHistoryValue = [{"taskId":"task-1","dateTime":dayjs().subtract(7, 'day').format()}];
        setLocalStorageItem(taskHistoryKey, taskHistoryValue);
    });

}
