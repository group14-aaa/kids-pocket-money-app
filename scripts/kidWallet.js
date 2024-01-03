$(document).ready(function () {
    const $balanceField = $("#balance-value");
    const $container = $(".container");

    let kidBalance = 0;
    const kidEmail = getCurrentUser().email;

    // Display the initial balance on page load
    updateDisplayBalance();

    // Check for stored balance on page load
    const storedBalance = getLocalStorageItem(`balanceTotal_${kidEmail}`, 0);
    if (storedBalance !== null) {
        kidBalance = parseFloat(storedBalance);
        updateDisplayBalance();
    }

    // playAudio on task complete
    function playAudio(audioFile) {
        const audio = new Audio(audioFile);
        audio.volume = 0.5; // Set volume to 50%
        audio.play();
    }

    // Event delegation for task completion, skip buttons, and withdrawal form submission
    $container.on("click", ".task-done-button, .task-not-complete-btn", handleTaskButtonClick);
    $(document).on("click", ".modal-submit-button", handleWithdrawal);

    // Display a gif on completed task and update balance
    function handleTaskButtonClick() {
        const card = $(this).closest(".col-md-4");
        const modalId = $(this).hasClass("task-done-button") ? "confirmationModal" : "skipModal";

        $(`#${modalId}`).modal("show");

        const confirmButtonId = $(this).hasClass("task-done-button") ? "#confirmTask" : "#confirmSkipTask";
        const cancelButtonId = $(this).hasClass("task-done-button") ? "#cancelTask" : "#cancelSkipTask";

        $(confirmButtonId).off("click").on("click", function () {
            if (modalId === "confirmationModal") {
                handleTaskCompletion(card);
            } else {
                skipTask(card);
            }

            $(`#${modalId}`).modal("hide");
            $(confirmButtonId).off("click");
        });

        $(cancelButtonId).off("click").on("click", function () {
            $(`#${modalId}`).modal("hide");
        });
    }

    function handleTaskCompletion(card) {
        const taskValue = parseFloat(card.data("task-value"));
        calculateBalance(taskValue);
        playAudio('./assets/audio/pencil_check_mark_1.mp3');
        displayGif(card);
    }

    function displayGif(card) {
        const gifCard = $("<div>").addClass("col-md-4 gif-card");

        callGiphyApi().then(function (giphyUrl) {
            const gifDiv = $("<div>").addClass("gif-container");
            const wellDone = $("<img>").attr("src", giphyUrl).addClass("centered-gif img-fluid");
            gifDiv.append(wellDone);
            gifCard.append(gifDiv);

            card.replaceWith(gifCard);

            const displayDuration = 3000;
            setTimeout(function () {
                gifCard.remove();
                moveTaskToHistory(card);
            }, displayDuration);
        });
    }

    function moveTaskToHistory(card) {
        const taskId = card.find(".task-done-button").data("task-id");
        const remainingAssignedKids = updateAssignedKids(taskId);

        // if (remainingAssignedKids.length === 0) {
        //     removeLocalStorageItem(taskId);
        // } else {
        updateTaskAssignedKids(taskId, remainingAssignedKids);
        // }

        // updateTaskHistory(taskId);
        // Update task history with date and time
        updateTaskHistory(taskId, dayjs().format());
        loadTasksToPage();
        displayTaskHistory();
    }

    function updateAssignedKids(taskId) {
        const tasks = getLocalStorageItem(taskId, {});
        return tasks.assignedKids.filter(kid => kid !== kidEmail);
    }

    function updateTaskAssignedKids(taskId, assignedKids) {
        const tasks = getLocalStorageItem(taskId, {});
        tasks.assignedKids = assignedKids;
        setLocalStorageItem(taskId, tasks);
    }

    function updateTaskHistory(taskId, dateTime) {
        const userTaskHistory = getLocalStorageItem(`taskHistory_${kidEmail}`, []);
        userTaskHistory.push({ taskId, dateTime });
        setLocalStorageItem(`taskHistory_${kidEmail}`, userTaskHistory);
    }


    function skipTask(card) {
        const taskId = card.find(".task-done-button").data("task-id");
        const remainingAssignedKids = updateAssignedKids(taskId);

        // if (remainingAssignedKids.length === 0) {
        //     removeLocalStorageItem(taskId);
        // } else {
        updateTaskAssignedKids(taskId, remainingAssignedKids);
        // }

        // updateTaskHistory(taskId);
        // Update task history with date and time
        updateTaskHistory(taskId, dayjs().format());
        loadTasksToPage();
        displayTaskHistory();
    }

    function calculateBalance(taskValue) {
        taskValue = parseFloat(taskValue);
        kidBalance += taskValue;
        setLocalStorageItem(`balanceTotal_${kidEmail}`, kidBalance);
        updateDisplayBalance();
    }

    function updateDisplayBalance() {
        const updatedBalance = parseFloat(getLocalStorageItem(`balanceTotal_${kidEmail}`, 0));
        $balanceField.text(updatedBalance.toFixed(2));
    }

    function handleWithdrawal(event) {
        event.preventDefault();
        const withdrawValue = parseFloat($("#withdraw-value-input").val());

        if (isNaN(withdrawValue) || withdrawValue <= 0) {
            displayErrorMessage("withdraw-modal", "Please enter a valid withdrawal amount.");
            return;
        }

        const kidCurrentBalance = parseFloat(getLocalStorageItem(`balanceTotal_${kidEmail}`, 0));

        if (withdrawValue > kidCurrentBalance) {
            displayErrorMessage("withdraw-modal", "Insufficient funds for withdrawal.");
            return;
        }

        // Update balance and save withdrawal request
        setLocalStorageItem(`balanceTotal_${kidEmail}`, (kidCurrentBalance - withdrawValue));
        updateDisplayBalance();

        const transactionId = generateTransactionId();
        const withdrawalRequest = {
            id: transactionId,
            date: dayjs().format(),
            kidEmail,
            parentEmail: getCurrentUser().parentEmail,
            amount: withdrawValue,
            status: "pending",
        };

        saveWithdrawalRequest(transactionId, withdrawalRequest);
        displayConfirmationMessage($("#confirmation-alert"), "Withdrawal request submitted!");
        $("#withdraw-form")[0].reset();
    }

    function generateTransactionId() {
        return "transaction-" + Date.now();
    }

    function saveWithdrawalRequest(transactionId, withdrawalRequest) {
        saveTransactionForUser(`withdrawals_${withdrawalRequest.kidEmail}`, transactionId);
        saveTransactionForUser(`withdrawals_${withdrawalRequest.parentEmail}`, transactionId);
        setLocalStorageItem(transactionId, withdrawalRequest);
    }

    function saveTransactionForUser(storageKey, transactionId) {
        const userTransactions = getLocalStorageItem(storageKey, []);
        userTransactions.push(transactionId);
        setLocalStorageItem(storageKey, userTransactions);
    }

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
                const formattedDateTime = dayjs(task.date).format('MMMM D, YYYY h:mm A');

                const card = `
                <div class="col-md-4 mb-4" data-task-value="${task.value}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${task.name || 'N/A'}</h5>
                            <p class="card-text">${task.description || 'N/A'}</p>
                            <p class="card-text">Value: £${task.value.toFixed(2) || 'N/A'}</p>
                            <p class="card-text">Added Date: ${formattedDateTime}</p>
                            <button type="submit" class="btn btn-primary task-done-button" data-task-id="${task.id}">Done</button>
                            <button class="btn-secondary task-not-complete-btn">Skip</button>
                        </div>
                    </div>
                </div>
            `;
                taskCardContainer.append(card);
            });
        }
    }

    // Load tasks to the table in kids dashboard
    function getTasksFromLocalStorage() {
        const currentUser = getCurrentUser();
        const tasks = [];

        // Iterate through all localStorage keys
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes("task")) {
                const task = getLocalStorageItem(key)
                // Check if the logged-in kid's email is in the task's assigned kids list
                if (task.assignedKids && task.assignedKids.includes(currentUser.email)) {
                    tasks.push(task);
                }
            }
        }
        return tasks;
    }

    // Load tasks to the page on initial page load
    loadTasksToPage();
    displayTaskHistory();
});
