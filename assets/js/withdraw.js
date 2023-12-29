$(document).ready(function () {



  // Get the logged-in kid's email
  const currentUser = getCurrentUser();
  const kidEmail = currentUser.email;

    // Event delegation event listener for withdraw button
    $(document).on("click", ".modal-submit-button", function () {

        //get value of the withdraw field 
      const withdrawValue = $("#withdraw-value-input").val();


          // Get current balance for the kid
let kidCurrentBalance = localStorage.getItem(`balanceTotal_${kidEmail}`) || 0;
kidCurrentBalance = JSON.parse(kidCurrentBalance);

kidCurrentBalance = kidCurrentBalance - withdrawValue;


    // Store the updated balance for the kid in local storage
    localStorage.setItem(`balanceTotal_${kidEmail}`, JSON.stringify(kidCurrentBalance));


console.log(kidCurrentBalance);
    
    });

  });


  

// calculate withdrawal amount

// Update the balance for the kid
// kidCurrentBalance += taskValue;

// Store the updated balance for the kid in local storage
// localStorage.setItem(`balanceTotal_${kidEmail}`, JSON.stringify(kidCurrentBalance));

// // Update the global kidBalance variable
// kidBalance = kidCurrentBalance;
