$(document).ready(function () {
  // DOM Elements
  const $balanceField = $("#balance-value");
  const $container = $(".container");

  let kidBalance = 0;

  // Play audio on task complete
  function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.volume = 0.5; // Set volume to 50%
    audio.play();
  }

  // Get the logged-in kid's email
  const kidEmail = getCurrentUser().email;

  // Check for stored balance on page load
  const storedBalance = getLocalStorageItem(`balanceTotal_${kidEmail}`);
  if (storedBalance !== null) {
    // If there is a stored balance, set it to the balance variable
    kidBalance = JSON.parse(storedBalance);
    // Display the balance on page load
    displayBalance();
  }

  // Event delegation for task completion and skip buttons
  $container.on("click", ".task-done-button, .task-not-complete-btn", function () {
    const card = $(this).closest(".col-md-4");

    // Open the confirmation modal based on the button clicked
    const modalId = $(this).hasClass("task-done-button") ? "confirmationModal" : "skipModal";
    $(`#${modalId}`).modal("show");

    const confirmButtonId = $(this).hasClass("task-done-button") ? "#confirmTask" : "#confirmSkipTask";
    const cancelButtonId = $(this).hasClass("task-done-button") ? "#cancelTask" : "#cancelSkipTask";

    // Set up the confirm button click event
    $(confirmButtonId).off("click").on("click", function () {
      if (modalId === "confirmationModal") {
        calculateBalance(card.data("task-value"), kidEmail);
        playAudio('./assets/audio/pencil_check_mark_1.mp3');
        displayGif(card);
      } else {
        skipTask(card);
      }

      // Close the confirmation modal
      $(`#${modalId}`).modal("hide");
      // Remove the click event handler to prevent potential issues
      $(confirmButtonId).off("click");
    });

    // Set up the cancel button click event
    $(cancelButtonId).off("click").on("click", function () {
      // Close the confirmation modal
      $(`#${modalId}`).modal("hide");
    });
  });

  // Display a gif on completed task
  function displayGif(card) {
    const gifCard = $("<div>").addClass("col-md-4 gif-card");

    callGiphyApi().then(function (giphyUrl) {
      let gifDiv = $("<div>").addClass("gif-container");
      let wellDone = $("<img>").attr("src", giphyUrl).addClass("centered-gif img-fluid");
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

  // Move task to history and update local storage
  function moveTaskToHistory(card) {
    const taskId = card.find(".task-done-button").data("task-id");
    const currentUser = getCurrentUser();
    const kidEmail = currentUser.email;

    const tasks = getLocalStorageItem(taskId, {});
    const remainingAssignedKids = tasks.assignedKids.filter(kid => kid !== kidEmail);

    if (remainingAssignedKids.length === 0) {
      removeLocalStorageItem(taskId);
    } else {
      tasks.assignedKids = remainingAssignedKids;
      setLocalStorageItem(taskId, tasks);
    }

    const userTaskHistory = getLocalStorageItem(`taskHistory_${kidEmail}`, []);
    userTaskHistory.push(taskId);
    setLocalStorageItem(`taskHistory_${kidEmail}`, userTaskHistory)

    loadTasksToPage();
  }

  // Skip a task and update local storage
  function skipTask(card) {
    const taskId = card.find(".task-done-button").data("task-id");
    const currentUser = getCurrentUser();
    const kidEmail = currentUser.email;

    const tasks = getLocalStorageItem(taskId, {});
    const assignedKids = tasks.assignedKids || [];

    const remainingAssignedKids = assignedKids.filter(kid => kid !== kidEmail);

    if (remainingAssignedKids.length === 0) {
      removeLocalStorageItem(taskId)
    } else {
      tasks.assignedKids = remainingAssignedKids;
      setLocalStorageItem(taskId, tasks);
    }

    const userTaskHistory = getLocalStorageItem(`taskHistory_${kidEmail}`, []);
    userTaskHistory.push(taskId);
    setLocalStorageItem(`taskHistory_${kidEmail}`, userTaskHistory);

    loadTasksToPage();
  }

  // Calculate balance and update local storage
  function calculateBalance(taskValue, kidEmail) {
    taskValue = parseFloat(taskValue);

    let kidCurrentBalance = getLocalStorageItem(`balanceTotal_${kidEmail}`, 0);
    kidCurrentBalance = JSON.parse(kidCurrentBalance);

    kidCurrentBalance += taskValue;

    setLocalStorageItem(`balanceTotal_${kidEmail}`, kidCurrentBalance);

    kidBalance = kidCurrentBalance;

    displayBalance();
  }

  // Display balance
  function displayBalance() {
    $balanceField.text(kidBalance.toFixed(2));
  }
});
