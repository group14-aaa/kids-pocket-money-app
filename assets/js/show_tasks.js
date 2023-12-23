  
 $(document).ready(function () { 

      const container = $('.container');
    
    //event delegation event listner for added task button  NOT WORKING
  container.on('click', '.task-done-button', function () {
  
    console.log("button pressed");

    // const card = $(this).closest('.card');
    //   const taskValue = card.find('.task.value').val();
    // console.log("Task Value:", taskValue);
 });

});