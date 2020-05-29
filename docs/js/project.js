/* ADD TASK LIST TO PROJECT PAGE CODE */

const addTaskBtn = document.querySelector(".add-task-btn");
const closeAddTaskPopup = document.querySelector(".close-add-task-popup");
const addTaskPopup = document.querySelector(".popup-add-task");
const createTaskBtn = document.getElementById("create-task-btn");
let colorCards = document.getElementsByClassName("color-card");
let priorityLelvels = document.getElementsByClassName("priority-level");
let day = "";
let month = "";
var chosenColor = "";
var priorityName = "";
var priorityColor = "";

addTaskBtn.addEventListener('click',function(){
    addTaskPopup.style.display = "flex";
});

closeAddTaskPopup.addEventListener('click',function(){
    addTaskPopup.style.display = "none";
});

createTaskBtn.addEventListener('click',createNewTask);

for(let i = 0; i < colorCards.length; i++){

    
    colorCards[i].addEventListener('click', function(){
        colorCards[i].classList.add("add-border")
    });

    colorCards[i].addEventListener('click',choosenTaskColor)

}

for(let j = 0; j < priorityLelvels.length; j++){

    priorityLelvels[j].addEventListener('click', validateCheckBox);
}

// Function: Render task list
function renderTaskList(){

    const taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
    const columndDiv = document.querySelector(".column-div");
    columndDiv.innerHTML = "";
    let counter= 0;
    for(task of taskList){

        const columnContent = document.createElement("div");

        columnContent.classList.add("column-content");

        const {taskTitle, image,taskDescription, TaskColor, taskPriority, taskDueDate} = task;
  
       columnContent.innerHTML = `
       <div class="task-div" style = "border-color : ${TaskColor}" ondragstart="drag(event)">
       <div class="task-title">
           <h5 class="dark-font">
               <!-- Task title will come here -->
               ${taskTitle}
              
           </h5>
       </div>
       <div class="task-priority" style = "color : ${priorityColor}">${taskPriority}</div>
       <div class="task-due-date">
           <p class="green-font">
           ${taskDueDate}
               
           </p>
       </div>
       <div class="task-members">
               <!-- Div to gather the images in a horisontal view -->
           <div class="member-img-div">
               <!-- Task member images will come here -->
               <div class="member-img">
               </div>
               
           </div>
       </div>
   </div>
            `;

            columndDiv.appendChild(columnContent);  
            
    }

}

/* Create task list function */
function createNewTask(event) {
    event.preventDefault();

    let membersArray = [];

    const taskTitle = document.querySelector(".task-title-input-field").value;

    const taskDescription = document.querySelector(".task-description-input-field").value;

    const taskAttachment = document.querySelector("[name='task-attachment']").dataset.files;

    month = document.getElementById("months").value;
    day = document.getElementById("days").value;

    const TaskColor = chosenColor;

    const taskPriority = priorityName;
    
    const taskPriorityColor = priorityColor;

    let taskDueDate = month + ","+ day;  
    
    const task = {taskTitle, taskDescription, taskAttachment, membersArray, TaskColor, taskPriority, taskDueDate, taskPriorityColor};
    
    const taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
    taskList.push(task);
    window.localStorage.setItem("taskList", JSON.stringify(taskList));

    renderTaskList();

    addTaskPopup.style.display = "none";
    
}

// Function: Allowing upload of images outside of working directory
function handleFileSelect(event) {
    function handleFileLoad(event) {
        document.querySelector("[name='image']").dataset.image = event.target.result;
    }

    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsDataURL(event.target.files[0]);
}

function handleFile(event) {
    function handleFileLoad(event) {
        document.querySelector("[name='task-attachment']").dataset.files = event.target.result;
    }

    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsDataURL(event.target.files[0]);
}

// getting the background color of the color-card
function choosenTaskColor(){

    const style = getComputedStyle(this);
    chosenColor = style.backgroundColor;
    
}

//Validate checkbox on create task
function validateCheckBox(){

    priorityName = this.name

    if(this.checked == true){

    if(priorityName === "critical"){

        priorityColor = "red";
    }else if(priorityName === "important"){
        priorityColor = "orange";
    }else{

        priorityColor = "green";
    }

    }
}

//FUNCTION: Render project list display (Side bar)
function renderProjectListDisplay(){

    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    const projectListDisplay = document.getElementById("project-list-div");

    projectListDisplay.innerHTML = "";

    let counter = 0;

    for (const project of projectList){

        const projectEl = document.createElement("div");
        projectEl.className = "project-list-el dark-font";
        projectEl.id = counter;

        const {projectName, statusCategory, projectColor} = project;

        projectEl.innerHTML = `<div class="color-div" style="background-color:${projectColor};"></div>${projectName}`;

        projectListDisplay.appendChild(projectEl);

        //var projectElList = projectListDisplay.children;
        //projectElList[counter].style.backgroundColor = projectColor;

        projectEl.onclick = goToProjectPage;

        counter++;
    }
}

//DRAG & DROP
const columnContent = document.querySelector(".column-content");
const taskDiv = document.querySelector(".task-div");

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}





window.onload = init;

function init() {
    renderProjectListDisplay()
}