let taskButton = document.getElementById('addTask');
let taskContainer = document.getElementById('listContainer');
let tasksArray = [];


// Add the task to the array when user presses Enter
taskButton.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (taskButton.value.trim() != ''){
        tasksArray.push({'taskName':taskButton.value.trim(), style:'none'});
        displayTasks();
    }
    taskButton.value = ''; 
  }
})


/* display tasks in tasksArray
if the editIndex is not null, the task to be edited appears as an input field, other normal task
*/
function displayTasks(editIndex){
    let tasks = '';
    tasksArray.forEach((item, index)=>{
        if (index == editIndex){
        tasks += `<li>
                <input id='editTaskField' type="text" placeholder="Update Task" value="${item['taskName']}">
            </li>`;
        }
        else {
            const checkedAttribute = item['style'] === 'underline' ? 'checked' : '';
            tasks += `<li>
                <input class='taskDone' type="checkbox" ${checkedAttribute} onclick=checkBox(${index})>
                <span class="${item['style'] == 'none' ? '':'line-through'}"  >${item['taskName']}</span>
                <i class="fa fa-edit edit" onclick=editTask(${index}) ></i>
                <i class="fa fa-trash del" onclick=deleteTask(${index})></i>
            </li>`
        }
    })
    taskContainer.innerHTML = tasks;
}

function checkBox(index){
    // Toggle the style based on current state
    if (tasksArray[index]['style'] === 'none') {
        tasksArray[index]['style'] = 'underline';
    } else {
        tasksArray[index]['style'] = 'none';
    }
    
    // Refresh the display to show updated state
    displayTasks();
}

function deleteTask(index){
    tasksArray.splice(index, 1); // remove the task at respective index from the array
    displayTasks();
}

function editTask(i){

    displayTasks(i);
    const editField = document.getElementById('editTaskField');
    
    if (editField) {
        editField.focus();  // Focus on the input field
        const valueLength = editField.value.length;
        editField.setSelectionRange(0, valueLength); // Select the previous text
    }
    editField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (editField.value.trim() != ''){
            tasksArray[i]['taskName'] = editField.value.trim();
            displayTasks();
        }
        editField.value = '';
    }
    })

}