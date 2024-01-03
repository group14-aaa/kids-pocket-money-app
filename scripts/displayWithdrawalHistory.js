
// Load transaction history to the page
function loadTransactionHistoryToPage() {
    const transactionHistory = getLocalStorageItem("transactionHistory", []);
    const transactionHistoryContainer = $("#transaction-history-container");
    transactionHistoryContainer.empty();
    const currentUser = getCurrentUser();

    // Sort transactions by acceptance date in descending order
    const sortedTransactions = transactionHistory
        .filter(transaction => currentUser.email === transaction.parentEmail || currentUser.email === transaction.kidEmail)
        .sort((a, b) => new Date(b.acceptanceDate) - new Date(a.acceptanceDate));

    if (sortedTransactions.length === 0) {
        // Display "No withdraw history" message
        transactionHistoryContainer.append(`
                    <div class="col-12 text-center mt-3">
                        <p>No withdraw history</p>
                    </div>
                `);
    } else {
        // Display sorted transactions
        sortedTransactions.forEach(transaction => {
            displayTransaction(transaction);
        });
    }
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
                      <p>Date: ${formatDate(transaction.acceptanceDate)}</p>
                  </div>
              </div>
          </div>`;
    $("#transaction-history-container").append(cardTemplate);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

$(document).ready(function () {
    // Load transaction history on document ready
    loadTransactionHistoryToPage();
});
