$(document).ready(function() {
const container = $('.container');
const taskNameInput = $('#task-name-input');
const taskDescriptionInput = $('#task-description-input');
const taskValueInput = $('#task-value-input');


container.on('click', '.task-submit-button', function() {
    const tasks = $([taskNameInput, taskDescriptionInput, taskValueInput]).map(function () {
       return $(this).val();
   }).get();

   saveTasks(tasks);
});

const currentTime = dayjs();
function saveTasks(tasks) {
localStorage.setItem(currentTime, JSON.stringify(tasks));
}

});