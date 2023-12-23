$(document).ready(function () {
    let balance = 0;
    balanceField = $("#balanceField");
    const container = $('.container');
  
//event delegation event listener for added task button
container.on('click', '.task-done-button', function () {
const card = $(this).closest('.col-md-4');
const taskValue = card.data('task-value');

console.log (balance);

calculateBalance(taskValue);

});

function calculateBalance (taskValue) {
    taskValue = parseFloat(taskValue);
    balance += taskValue;
 // balanceField.text(balance);
}

//store balance in local storage
localStorage.setItem("balanceTotal", JSON.stringify(balance));

  });

