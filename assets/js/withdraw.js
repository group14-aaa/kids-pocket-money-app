$(document).ready(function () {

  // Display current balance for the kid
  function updateDisplayBalance() {
      const kidEmail = getCurrentUser().email;
      const updatedBalance = parseFloat(localStorage.getItem(`balanceTotal_${kidEmail}`)) || 0;
      $("#balance-value").text(updatedBalance.toFixed(2));
  }

  // Handle withdrawal form submission
  function handleWithdrawal(event) {
      event.preventDefault();
      const currentUser = getCurrentUser();
      const kidEmail = currentUser.email;
      const parentEmail = currentUser.parentEmail;

      const withdrawValue = parseFloat($("#withdraw-value-input").val());

      if (isNaN(withdrawValue) || withdrawValue <= 0) {
          displayErrorMessage("withdraw-modal", "Please enter a valid withdrawal amount.");
          return;
      }

      let kidCurrentBalance = parseFloat(localStorage.getItem(`balanceTotal_${kidEmail}`)) || 0;

      if (withdrawValue > kidCurrentBalance) {
          displayErrorMessage("withdraw-modal", "Insufficient funds for withdrawal.");
          return;
      }

      // Update balance and save withdrawal request
      kidCurrentBalance -= withdrawValue;
      localStorage.setItem(`balanceTotal_${kidEmail}`, kidCurrentBalance.toFixed(2));
      updateDisplayBalance();

      const transactionId = generateTransactionId();
      const withdrawalRequest = {
          id: transactionId,
          date: dayjs().format(),
          kidEmail,
          parentEmail,
          amount: withdrawValue,
          status: "pending",
      };

      saveWithdrawalRequest(transactionId, withdrawalRequest);
      displayConfirmationMessage($("#confirmation-alert"), "Withdrawal request submitted!");
      $("#withdraw-form")[0].reset();
  }

  // Generate a unique transaction ID
  function generateTransactionId() {
      return "transaction-" + Date.now();
  }

  // Save withdrawal request to localStorage
  function saveWithdrawalRequest(transactionId, withdrawalRequest) {
      saveTransactionForUser(`withdrawals_${withdrawalRequest.kidEmail}`, transactionId);
      saveTransactionForUser(`withdrawals_${withdrawalRequest.parentEmail}`, transactionId);
      localStorage.setItem(transactionId, JSON.stringify(withdrawalRequest));
  }

  // Save transaction ID for user
  function saveTransactionForUser(storageKey, transactionId) {
      const userTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];
      userTransactions.push(transactionId);
      localStorage.setItem(storageKey, JSON.stringify(userTransactions));
  }

  // Event listener for withdrawal submission
  $(document).on("click", ".modal-submit-button", handleWithdrawal);

  // Clear withdrawal message
  $(document).on("click", ".fundsPaidButton", function () {
      $(".withdrawMessage").empty();
  });

  // Display initial balance on page load
  updateDisplayBalance();
});
