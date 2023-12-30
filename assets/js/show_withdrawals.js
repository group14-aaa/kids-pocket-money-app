$(document).ready(function () {

  // Load withdrawal requests to the parent dashboard
  function loadWithdrawalsToPage() {
      const currentUser = getCurrentUser();
      const parentEmail = currentUser.email;

      const parentWithdrawals = JSON.parse(localStorage.getItem(`withdrawals_${parentEmail}`)) || [];

      const withdrawalContainer = $("#withdrawal-request-container");
      withdrawalContainer.empty();

      parentWithdrawals.forEach(withdrawalId => {
          const withdrawalRequest = JSON.parse(localStorage.getItem(withdrawalId));
          displayWithdrawalRequest(withdrawalRequest);
      });
  }

  // Display a withdrawal request card
  function displayWithdrawalRequest(withdrawalRequest) {
      const cardTemplate = `
          <div class="col-md-4">
              <div class="card mb-4">
                  <div class="card-body">
                      <h5 class="card-title">Withdrawal Request</h5>
                      <p>Kid: ${withdrawalRequest.kidEmail}</p>
                      <p>Amount: £${withdrawalRequest.amount.toFixed(2)}</p>
                      <p>Status: ${withdrawalRequest.status}</p>
                      <button class="btn btn-success accept-withdrawal-button" data-withdrawal-id="${withdrawalRequest.id}">Accept</button>
                  </div>
              </div>
          </div>`;
      $("#withdrawal-request-container").append(cardTemplate);
  }

  // Accept withdrawal request event handler
  $(document).on("click", ".accept-withdrawal-button", function () {
      const withdrawalId = $(this).data("withdrawal-id");
      const withdrawalRequest = JSON.parse(localStorage.getItem(withdrawalId));

      // Update the status to "Accepted"
      withdrawalRequest.status = "Accepted";
      localStorage.setItem(withdrawalId, JSON.stringify(withdrawalRequest));

      // Move to transaction history
      moveWithdrawalToTransactionHistory(withdrawalRequest);
      loadWithdrawalsToPage();
  });

  // Move a withdrawal to transaction history
  function moveWithdrawalToTransactionHistory(withdrawalRequest) {
      const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
      transactionHistory.push(withdrawalRequest);
      localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));

      // Remove from parent's withdrawals
      const parentEmail = getCurrentUser().email;
      const parentWithdrawals = JSON.parse(localStorage.getItem(`withdrawals_${parentEmail}`)) || [];
      const updatedParentWithdrawals = parentWithdrawals.filter(id => id !== withdrawalRequest.id);
      localStorage.setItem(`withdrawals_${parentEmail}`, JSON.stringify(updatedParentWithdrawals));
  }

  // Load withdrawals on dashboard load
  loadWithdrawalsToPage();
});
