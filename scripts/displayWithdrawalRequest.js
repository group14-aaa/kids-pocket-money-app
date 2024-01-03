// Load withdrawal requests to the parent or kid dashboard
function loadWithdrawalsToPage() {
  const currentUser = getCurrentUser();
  const isParent = currentUser.userType === 'parent';

  // Clear the container initially
  const withdrawalContainer = $("#withdrawal-request-container");
  withdrawalContainer.empty();

  if (currentUser.userType === 'kid') {
    // If it's a kid, show only their withdrawal requests
    const kidEmail = currentUser.email;
    const kidWithdrawals = getLocalStorageItem(`withdrawals_${kidEmail}`, []);

    // Display message if no pending withdrawals
    if (kidWithdrawals.some(withdrawalId => getLocalStorageItem(withdrawalId).status === 'pending')) {
      // Display withdrawal requests
      kidWithdrawals.forEach(withdrawalId => {
        const withdrawalRequest = getLocalStorageItem(withdrawalId);
        if (withdrawalRequest.status === 'pending') {
          displayWithdrawalRequest(withdrawalRequest, isParent);
        }
      });
    } else {
      withdrawalContainer.append('<div class="col-12 text-center mt-3"><p>No pending withdrawals available</p></div>');
    }

  } else {
    // If it's a parent, load all withdrawal requests
    const parentEmail = currentUser.email;
    const parentWithdrawals = getLocalStorageItem(`withdrawals_${parentEmail}`, []);

    // Display message if no pending withdrawals
    if (parentWithdrawals.every(withdrawalId => getLocalStorageItem(withdrawalId).status !== 'pending')) {
      withdrawalContainer.append('<div class="col-12 text-center mt-3"><p>No pending withdrawals available</p></div>');
    } else {
      parentWithdrawals.forEach(withdrawalId => {
        const withdrawalRequest = getLocalStorageItem(withdrawalId);

        // Add acceptanceDate property to withdrawal request
        withdrawalRequest.acceptanceDate = new Date().toISOString();
        displayWithdrawalRequest(withdrawalRequest, isParent);
      });
    }
  }
}

// Accept withdrawal request event handler
$(document).on("click", ".accept-withdrawal-button", function () {
  const withdrawalId = $(this).data("withdrawal-id");
  const withdrawalRequest = getLocalStorageItem(withdrawalId);

  // Display confirmation modal
  $('#confirmWithdrawalModal').modal('show');

  // When confirming the withdrawal from the modal
  $('#confirmWithdrawalBtn').off().on('click', function () {
    // Update the status to "Accepted"
    updateWithdrawalStatus(withdrawalRequest, "Accepted");

    // Move to transaction history
    moveWithdrawalToTransactionHistory(withdrawalRequest);
    loadWithdrawalsToPage();
    loadTransactionHistoryToPage();

    // Hide the modal after action
    $('#confirmWithdrawalModal').modal('hide');
    // Display success message
    const confirmationAlert = $('#confirmation-alert-withdraw');
    // Show confirmation message
    displayConfirmationMessage(confirmationAlert, "Withdraw accepted successfully!");
  });
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

// Display a withdrawal request card
function displayWithdrawalRequest(withdrawalRequest, isParent) {
  const cardTemplate = `
        <div class="col-md-4">
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Withdrawal Request</h5>
                    ${isParent ? `<p>Kid: ${withdrawalRequest.kidEmail}</p>` : ''}
                    <p>Amount: £${withdrawalRequest.amount.toFixed(2)}</p>
                    <p>Status: ${withdrawalRequest.status}</p>
                    ${isParent ? `<button class="btn btn-success accept-withdrawal-button" data-withdrawal-id="${withdrawalRequest.id}">Accept</button>` : ''}
                </div>
            </div>
        </div>`;
  $("#withdrawal-request-container").append(cardTemplate);
}

$(document).ready(function () {
  // Load withdrawals on dashboard load
  loadWithdrawalsToPage();
});
