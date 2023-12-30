$(document).ready(function () {

  // Load transaction history to the page
  function loadTransactionHistoryToPage() {
      const transactionHistory = getLocalStorageItem("transactionHistory", []);
      const transactionHistoryContainer = $("#transaction-history-container");
      transactionHistoryContainer.empty();

      const currentUser = getCurrentUser();

      transactionHistory.forEach(transaction => {
          if (currentUser.email === transaction.parentEmail || currentUser.email === transaction.kidEmail) {
              displayTransaction(transaction);
          }
      });
  }

  // Display a transaction card
  function displayTransaction(transaction) {
      const cardTemplate = `
          <div class="col-md-4">
              <div class="card mb-4">
                  <div class="card-body">
                      <h5 class="card-title">Transaction Details</h5>
                      <p>Kid: ${transaction.kidEmail}</p>
                      <p>Amount: £${transaction.amount.toFixed(2)}</p>
                      <p>Status: ${transaction.status}</p>
                  </div>
              </div>
          </div>`;
      $("#transaction-history-container").append(cardTemplate);
  }

  // Load transaction history on document ready
  loadTransactionHistoryToPage();
});
