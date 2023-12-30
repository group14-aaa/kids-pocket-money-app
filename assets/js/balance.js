$(document).ready(function () {
  let kidBalance = 0;
  let balanceField = $("#balance-value");
  const container = $(".container");

  // Function to play audio on task complete
  function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.volume = 0.5; // Set volume to 50%
    audio.play();
  }

  // Get the logged-in kid's email
  const currentUser = getCurrentUser();
  const kidEmail = currentUser.email;

  // Check for stored balance on page load
  const storedBalance = getLocalStorageItem(`balanceTotal_${kidEmail}`);
  if (storedBalance !== null) {
    // If there is a stored balance, set it to the balance variable
    kidBalance = JSON.parse(storedBalance);
    // Display the balance on page load
    displayBalance();
  }

  // Event delegation event listener for added task button
  container.on("click", ".task-done-button", function () {
    const card = $(this).closest(".col-md-4");
    const taskValue = card.data("task-value");

    // Open the confirmation modal
    $("#confirmationModal").modal("show");

    // Set up the confirm button click event
    $("#confirmTask").off("click").on("click", function () {
      // Calculate the balance for the kid and store in local storage
      calculateBalance(taskValue, kidEmail);

      // Close the confirmation modal
      $("#confirmationModal").modal("hide");

      // Play audio on completing a task
      playAudio('./assets/audio/pencil_check_mark_1.mp3');

      // Apply gif animation to the completed task card
      displayGif(card);

      // Remove the click event handler to prevent potential issues
      $("#confirmTask").off("click");
    });

    // Set up the cancel button click event
    $("#cancelTask").off("click").on("click", function () {
      // Close the confirmation modal
      $("#confirmationModal").modal("hide");
    });
  });


  ///event lister for skip task button
  container.on("click", ".task-not-complete-btn", function () {
    const card = $(this).closest(".col-md-4");

    // Open the confirmation modal
    $("#skipModal").modal("show");

    // Set up the confirm button click event
    $("#confirmSkipTask").off("click").on("click", function () {
      ///remove task from local storage
      skipTask(card);

      // Close the confirmation modal
      $("#skipModal").modal("hide");

      // Remove the click event handler to prevent potential issues
      $("#confirmSkipTask").off("click");
    });

    // Set up the cancel button click event
    $("#cancelSkipTask").off("click").on("click", function () {
      // Close the confirmation modal
      $("#skipModal").modal("hide");

    });
  });

  // Function to display a gif on completed task
  function displayGif(card) {
    // Create a new card for the Giphy gif
    const gifCard = $("<div>").addClass("col-md-4 gif-card");

    // Call Giphy API and append gif to the new card
    callGiphyApi().then(function (giphyUrl) {
      let gifDiv = $("<div>").addClass("gif-container");
      let wellDone = $("<img>").attr("src", giphyUrl).addClass("centered-gif img-fluid");
      gifDiv.append(wellDone);
      gifCard.append(gifDiv);

      // Replace the completed task card with the gif card
      card.replaceWith(gifCard);

      // Timeout duration for removing the gif card
      const displayDuration = 3000; // 10 seconds gif display duration

      // After display duration, remove the gif card
      setTimeout(function () {
        gifCard.remove();
        // Move the task to history after gif is removed
        moveTaskToHistory(card);
      }, displayDuration);
    });
  }

  function moveTaskToHistory(card) {
    // Get the task ID from the card
    const taskId = card.find(".task-done-button").data("task-id");

    // Get the logged-in kid's email
    const currentUser = getCurrentUser();
    const kidEmail = currentUser.email;

    // Remove the task from local storage
    const tasks = getLocalStorageItem(taskId, []);
    const remainingAssignedKids = tasks.assignedKids.filter(kid => kid !== kidEmail);

    if (remainingAssignedKids.length === 0) {
      // Remove the task from local storage if no other kids are assigned
      removeLocalStorageItem(taskId);
    } else {
      // Update the task with remaining assigned kids
      tasks.assignedKids = remainingAssignedKids;
      setLocalStorageItem(taskId, tasks);
    }

    // Add the task to task history for the kid
    const userTaskHistory = getLocalStorageItem(`taskHistory_${kidEmail}`, []);
    userTaskHistory.push(taskId);
    setLocalStorageItem(`taskHistory_${kidEmail}`, userTaskHistory)

    // Reload tasks on the page
    loadTasksToPage();
  }

  function skipTask(card) {
    console.log(card);
    // Get the task ID from the card
    const taskId = card.find(".task-done-button").data("task-id");

    // Get the logged-in kid's email
    const currentUser = getCurrentUser();
    const kidEmail = currentUser.email;

    // Remove the task from local storage
    const tasks = getLocalStorageItem(taskId, {});
    const assignedKids = tasks.assignedKids || [];

    const remainingAssignedKids = assignedKids.filter(kid => kid !== kidEmail);

    if (remainingAssignedKids.length === 0) {
      // Remove the task from local storage if no other kids are assigned
      removeLocalStorageItem(taskId)
    } else {
      // Update the task with remaining assigned kids
      tasks.assignedKids = remainingAssignedKids;
      setLocalStorageItem(taskId, tasks);

    }

    // Add the task to task history for the kid
    const userTaskHistory = getLocalStorageItem(`taskHistory_${kidEmail}`, []);
    userTaskHistory.push(taskId);
    setLocalStorageItem(`taskHistory_${kidEmail}`, userTaskHistory);

    // Reload tasks on the page
    loadTasksToPage();
  }

  // Calculate Balance and store in local storage for each kid
  function calculateBalance(taskValue, kidEmail) {
    taskValue = parseFloat(taskValue);

    // Get current balance for the kid
    let kidCurrentBalance = getLocalStorageItem(`balanceTotal_${kidEmail}`, 0);
    kidCurrentBalance = JSON.parse(kidCurrentBalance);

    // Update the balance for the kid
    kidCurrentBalance += taskValue;

    // Store the updated balance for the kid in local storage
    setLocalStorageItem(`balanceTotal_${kidEmail}`, kidCurrentBalance);

    // Update the global kidBalance variable
    kidBalance = kidCurrentBalance;

    // Display the balance for the kid
    displayBalance();
  }

  // Function to get items from storage and display
  function displayBalance() {
    // Set the text content of the balanceField with two decimal points
    balanceField.text(kidBalance.toFixed(2));
  }
});
