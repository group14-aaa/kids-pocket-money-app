// Set seed data in local storage
function setSeedUserData() {
    const seedUsers = [
        { email: 'parent@gmail.com', password: 'parent', userType: 'parent', parentEmail: '' },
        { email: 'kid1@gmail.com', password: 'kid1', userType: 'kid', parentEmail: 'parent@gmail.com' },
        { email: 'kid2@gmail.com', password: 'kid2', userType: 'kid', parentEmail: 'parent@gmail.com' }
    ];

    seedUsers.forEach(user => setLocalStorageItem('users', seedUsers));
    setLocalStorageItem('isLoggedIn', false);
}

// Set seed tasks for kids
function setSeedTasksForKids() {

    const addSeedTasks = [
        {
            kidEmail: 'kid1@gmail.com',
            taskId: ['task-seed-1', 'task-seed-2', 'task-seed-4', 'task-seed-6', 'task-seed-7', 'task-seed-8', 'task-seed-10', 'task-seed-12', 'task-seed-13'],
        },
        {
            kidEmail: 'kid2@gmail.com',
            taskId: ['task-seed-1', 'task-seed-3', 'task-seed-4', 'task-seed-5', 'task-seed-7', 'task-seed-9', 'task-seed-10', 'task-seed-11', 'task-seed-13'],
        },

    ];

    addSeedTasks.forEach(kidTask => {
        setLocalStorageItem(kidTask.kidEmail, kidTask.taskId)
    });

    const seedTasks = [
        {
            id: 'task-seed-1',
            date: dayjs().subtract(1, 'day').format(),
            name: 'Keep Your Room Neat',
            description: 'Tidy up your room, make your bed, and organize your belongings.',
            value: 5.00,
            assignedKids: ['kid1@gmail.com', 'kid2@gmail.com']
        },
        {
            id: 'task-seed-2',
            date: dayjs().subtract(2, 'day').format(),
            name: 'Help with Dish washing',
            description: 'Wash the dishes after meals and make sure the kitchen is clean.',
            value: 7.50,
            assignedKids: ['kid1@gmail.com']
        },
        {
            id: 'task-seed-3',
            date: dayjs().subtract(3, 'day').format(),
            name: 'Take Out the Trash',
            description: 'Empty the trash bins in the kitchen and bathroom.',
            value: 3.00,
            assignedKids: ['kid2@gmail.com']
        },
        {
            id: 'task-seed-4',
            date: dayjs().subtract(4, 'day').format(),
            name: 'Vacuum the Living Room',
            description: 'Vacuum the carpets in the living room and make it look neat.',
            value: 6.00,
            assignedKids: ['kid1@gmail.com', 'kid2@gmail.com']
        },
        {
            id: 'task-seed-5',
            date: dayjs().subtract(5, 'day').format(),
            name: 'Water the Indoor Plants',
            description: 'Take care of the indoor plants by watering them.',
            value: 4.50,
            assignedKids: ['kid2@gmail.com']
        },
        {
            id: 'task-seed-6',
            date: dayjs().subtract(6, 'day').format(),
            name: 'Assist with Laundry',
            description: 'Help in sorting, folding, or putting away laundry items.',
            value: 5.50,
            assignedKids: ['kid1@gmail.com']
        },
        {
            id: 'task-seed-7',
            date: dayjs().subtract(7, 'day').format(),
            name: 'Set the Table for Meals',
            description: 'Help in setting the dining table before breakfast, lunch, or dinner.',
            value: 3.50,
            assignedKids: ['kid2@gmail.com', 'kid1@gmail.com']
        },
        {
            id: 'task-seed-8',
            date: dayjs().subtract(8, 'day').format(),
            name: 'Clean Up After Pets',
            description: 'Ensure that the pet\'s area is clean, including food and water bowls.',
            value: 4.00,
            assignedKids: ['kid1@gmail.com']
        },
        {
            id: 'task-seed-9',
            date: dayjs().subtract(9, 'day').format(),
            name: 'Help with Grocery Unloading',
            description: 'Assist in unloading groceries and organizing them in the kitchen.',
            value: 5.00,
            assignedKids: ['kid2@gmail.com']
        },
        {
            id: 'task-seed-10',
            date: dayjs().subtract(10, 'day').format(),
            name: 'Dust and Wipe Furniture',
            description: 'Dust and wipe down surfaces, including tables, shelves, and cabinets.',
            value: 4.00,
            assignedKids: ['kid1@gmail.com', 'kid2@gmail.com']
        },
        {
            id: 'task-seed-11',
            date: dayjs().subtract(11, 'day').format(),
            name: 'Sweep the Floors',
            description: 'Use a broom to sweep and clean the floors in designated areas.',
            value: 4.50,
            assignedKids: ['kid2@gmail.com']
        },
        {
            id: 'task-seed-12',
            date: dayjs().subtract(12, 'day').format(),
            name: 'Unload and Reload the Dishwasher',
            description: 'Assist in unloading the dishwasher and reloading it with clean dishes.',
            value: 6.00,
            assignedKids: ['kid1@gmail.com']
        },
        {
            id: 'task-seed-13',
            date: dayjs().subtract(13, 'day').format(),
            name: 'Organize Bookshelves',
            description: 'Arrange books and items on the bookshelves in an orderly manner.',
            value: 3.50,
            assignedKids: ['kid2@gmail.com', 'kid1@gmail.com']
        },
        {
            id: 'task-seed-14',
            date: dayjs().subtract(14, 'day').format(),
            name: 'Wipe Down Bathroom Surfaces',
            description: 'Wipe down bathroom surfaces, including sinks.',
            value: 5.00,
            assignedKids: []
        },
        {
            id: 'task-seed-15',
            date: dayjs().subtract(15, 'day').format(),
            name: 'Sort and Recycle',
            description: 'Help in sorting recyclable materials and taking them to the recycling bin.',
            value: 3.00,
            assignedKids: []
        },
        {
            id: 'task-seed-16',
            date: dayjs().subtract(16, 'day').format(),
            name: 'Mop the Floors',
            description: 'Use a mop to clean and mop the floors in designated areas.',
            value: 5.50,
            assignedKids: []
        },
        {
            id: 'task-seed-17',
            date: dayjs().subtract(17, 'day').format(),
            name: 'Water Outdoor Plants',
            description: 'Take care of outdoor plants by watering them as needed.',
            value: 4.00,
            assignedKids: []
        },
        {
            id: 'task-seed-18',
            date: dayjs().subtract(18, 'day').format(),
            name: 'Help with Meal Preparation',
            description: 'Assist in preparing ingredients or simple tasks during meal preparation.',
            value: 6.00,
            assignedKids: []
        },
        {
            id: 'task-seed-19',
            date: dayjs().subtract(19, 'day').format(),
            name: 'Wipe Down Kitchen Surfaces',
            description: 'Clean and wipe down kitchen surfaces, including appliances.',
            value: 4.50,
            assignedKids: []
        },
        {
            id: 'task-seed-20',
            date: dayjs().subtract(20, 'day').format(),
            name: 'Fold and Put Away Laundry',
            description: 'Help in folding clothes and putting them away in the correct places.',
            value: 5.00,
            assignedKids: []
        },
    ];

    seedTasks.forEach(activeTask => {
        setLocalStorageItem(activeTask.id, activeTask)
    });

    seedTasks.forEach(task => setLocalStorageItem(task.id, task));

    const seedTasksKey = [
        { email: 'kid1@gmail.com' },
        { email: 'kid2@gmail.com' }
    ];

    seedTasksKey.forEach((kid, kidIndex) => {
        const taskHistoryKey = `taskHistory_${kid.email}`;
        const taskHistoryValue = seedTasks
            .slice(-7)
            .filter((task, index) => index % 2 === kidIndex) // Filter tasks based on kidIndex
            .map((task, index) => ({ "taskId": task.id, "dateTime": dayjs().subtract(index + 14, 'day').format() }));
        setLocalStorageItem(taskHistoryKey, taskHistoryValue);
    });
}

// Set seed balance for kids
function setSeedBalanceForKids() {
    const kidsEmail = [
        { email: 'kid1@gmail.com', balance: 6 },
        { email: 'kid2@gmail.com', balance: 2.5 },
    ];

    kidsEmail.forEach(kid => {
        localStorage.setItem(`balanceTotal_${kid.email}`, kid.balance);
    });
}

// Set seed transactions for kids and parent
function setSeedWithdrawTransaction() {
    // Initialize counters for unique transaction IDs
    let transactionIdCounterKid1 = 1;
    let transactionIdCounterKid2 = 5;

    // Create a transaction object
    function createTransaction(id, kidEmail, parentEmail, amount, status) {
        const currentDate = new Date().toISOString();
        return {
            id: `transaction-seed-${id}`,
            date: currentDate,
            kidEmail: kidEmail,
            parentEmail: parentEmail,
            amount: amount,
            status: status,
            acceptanceDate: status === 'Accepted' ? new Date().toISOString() : null
        };
    }

    // Initialize transactions for kid1@gmail.com
    const transactionsKid1 = [
        createTransaction(transactionIdCounterKid1++, 'kid1@gmail.com', 'parent@gmail.com', 3, 'pending'),
        createTransaction(transactionIdCounterKid1++, 'kid1@gmail.com', 'parent@gmail.com', 2, 'pending'),
        createTransaction(transactionIdCounterKid1++, 'kid1@gmail.com', 'parent@gmail.com', 5.5, 'Accepted'),
        createTransaction(transactionIdCounterKid1++, 'kid1@gmail.com', 'parent@gmail.com', 5, 'Accepted')
    ];

    // Initialize transactions for kid2@gmail.com
    const transactionsKid2 = [
        createTransaction(transactionIdCounterKid2++, 'kid2@gmail.com', 'parent@gmail.com', 2, 'pending'),
        createTransaction(transactionIdCounterKid2++, 'kid2@gmail.com', 'parent@gmail.com', 2, 'pending'),
        createTransaction(transactionIdCounterKid2++, 'kid2@gmail.com', 'parent@gmail.com', 5, 'Accepted')
    ];

    // Set transactions and transaction history in localStorage
    transactionsKid1.forEach(transaction => {
        setLocalStorageItem(transaction.id, transaction);
    });

    transactionsKid2.forEach(transaction => {
        setLocalStorageItem(transaction.id, transaction);
    });

    // Create transaction history array for all accepted transactions
    const transactionHistory = transactionsKid1.concat(transactionsKid2).filter(transaction => transaction.status === 'Accepted');

    // Set transaction history in localStorage
    setLocalStorageItem('transactionHistory', transactionHistory);

    // Set withdrawal lists in localStorage
    setLocalStorageItem('withdrawals_kid1@gmail.com', [
        'transaction-seed-1', 'transaction-seed-2', 'transaction-seed-3', 'transaction-seed-4'
    ]);

    setLocalStorageItem('withdrawals_kid2@gmail.com', [
        'transaction-seed-5', 'transaction-seed-6', 'transaction-seed-7'
    ]);

    setLocalStorageItem('withdrawals_parent@gmail.com', [
        'transaction-seed-1', 'transaction-seed-2', 'transaction-seed-5', 'transaction-seed-6'
    ]);
}
