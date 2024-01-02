$(document).ready(function () {
  // Load withdrawal requests to the parent dashboard
  function loadWithdrawalsToPage() {
    const parentEmail = getCurrentUser().email;
    const parentWithdrawals = getLocalStorageItem(`withdrawals_${parentEmail}`, []);

    const withdrawalContainer = $("#withdrawal-request-container");
    withdrawalContainer.empty();

    parentWithdrawals.forEach(withdrawalId => {
      const withdrawalRequest = getLocalStorageItem(withdrawalId);

      // Add acceptanceDate property to withdrawal request
      withdrawalRequest.acceptanceDate = new Date().toISOString();

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
    const withdrawalRequest = getLocalStorageItem(withdrawalId);

    // Update the status to "Accepted"
    updateWithdrawalStatus(withdrawalRequest, "Accepted");

    // Move to transaction history
    moveWithdrawalToTransactionHistory(withdrawalRequest);
    loadWithdrawalsToPage();
  });

  // Update withdrawal status
  function updateWithdrawalStatus(withdrawalRequest, status) {
    withdrawalRequest.status = status;
    setLocalStorageItem(withdrawalRequest.id, withdrawalRequest);
  }

  // Move a withdrawal to transaction history
  function moveWithdrawalToTransactionHistory(withdrawalRequest) {
    const transactionHistory = getLocalStorageItem("transactionHistory", []);

    // Add acceptanceDate property to withdrawal request in transaction history
    withdrawalRequest.acceptanceDate = new Date().toISOString();

    transactionHistory.push(withdrawalRequest);
    setLocalStorageItem("transactionHistory", transactionHistory);

    // Remove from parent's withdrawals
    const parentEmail = getCurrentUser().email;
    const parentWithdrawals = getLocalStorageItem(`withdrawals_${parentEmail}`, []);
    const updatedParentWithdrawals = parentWithdrawals.filter(id => id !== withdrawalRequest.id);
    setLocalStorageItem(`withdrawals_${parentEmail}`, updatedParentWithdrawals);
  }

  // Load withdrawals on dashboard load
  loadWithdrawalsToPage();
});
