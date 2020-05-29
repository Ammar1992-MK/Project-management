//HTML objects
const addProjectBtn = document.querySelector(".add-project-btn");
const exitBtn = document.querySelector(".exit-btn");
const closeMemberForm = document.querySelector(".close-member-form");
const submitProjectBtn = document.querySelector(".submit-project-btn");
const addCategoryBtn = document.querySelector(".add-category-btn");
const deleteCategoryBtn = document.querySelector(".delete-category-btn");
const readyToGoBtn = document.getElementById("bottom-btn");
const ProjectForm = document.querySelector(".popup-project-info");
const addMemberForm = document.getElementById("popup-add-members-info")
const categoriesDiv = document.querySelector(".categories-div");
let colorDivs = document.getElementsByClassName("color-div");
var chosenColor = "";
var statusCategory = [];
var chosenCategory = [];
let itemsToBeRemoved = [];
var teamMembers = [];

//EVENT LISTENERS
addProjectBtn.addEventListener('click',function(){

    ProjectForm.style.display = "flex";

});

exitBtn.addEventListener('click',function(){

    ProjectForm.style.display = "none";

});

closeMemberForm.addEventListener('click',function(){

    addMemberForm.style.display = "none";
})



submitProjectBtn.addEventListener('click',function(){
    ProjectForm.style.display = "none";
    renderProjectWorkBoard()
    addMemberForm.style.display = "flex";
});


addCategoryBtn.addEventListener('click',renderStatusCategory);

for(let i = 0; i < colorDivs.length; i++){

    
    colorDivs[i].addEventListener('click', function(){
        colorDivs[i].classList.add("add-border")
    });

    colorDivs[i].addEventListener('click',chooseProjectColor);

}

readyToGoBtn.addEventListener('click',function(){

    createProjectWorkBoard()

    const projectArray = document.getElementsByClassName("project-box");
    const lastAdded = projectArray.length -1;
    const thisProject = projectArray[lastAdded];
    
    id = thisProject.id;
    const projectId = {id};

    const projectIdList = JSON.parse(window.localStorage.getItem("projectIdList")) || [];
    projectIdList.unshift(projectId);
    window.localStorage.setItem("projectIdList", JSON.stringify(projectIdList));
    
    window.location = "project.html";
})


//FUNCTIONS

/*    CREATE PROJECT   */

//Create project
function createProjectWorkBoard(){

    const projectName = document.querySelector(".name-input").value;

    console.log(itemsToBeRemoved);

    //For loop to remove uwanted categories from local storage
    for(let i = 0; i < chosenCategory.length; i++){

       for(let j = 0 ; j < itemsToBeRemoved.length; j++){

        if(chosenCategory[i].innerHTML === itemsToBeRemoved[j].innerHTML){

            chosenCategory.splice(i,1);
        }
       }
    }
    teamMembers = Object.values(projectMemberArray);

    statusCategory = chosenCategory;

    const projectColor = chosenColor;

    const project = {projectName,statusCategory,projectColor, teamMembers};

    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    
    projectList.push(project);

    window.localStorage.setItem("projectList",JSON.stringify(projectList));

   // clear input felt
   document.querySelector(".name-input").value = "";

   renderProjectWorkBoard();

   ProjectForm.style.display = "none";

   //addMemberForm.style.display = "flex";

   renderMemberList();
 
}

//Printing project Name to work board
function renderProjectWorkBoard(){

    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    const submittedProjects = document.querySelector(".submitted-projects");
    submittedProjects.innerHTML = "";
    let counter = 0;

    for( const project of projectList){

        const projectEl = document.createElement("div");
        projectEl.className = "project-box";
        projectEl.id = counter;
        

        const {projectName, statusCategory, projectColor} = project;

        projectEl.innerHTML = `
                            <div class = "project-box-textbar"">
                             <h3 class = "dark-font" >${projectName}</h3>
                            </div>`;

        submittedProjects.appendChild(projectEl);
        var projectElList = submittedProjects.children;
        projectElList[counter].style.backgroundColor = projectColor;

        projectEl.onclick = goToProjectPage;

        counter++;
     
    }
}
    

// Printing status category
function renderStatusCategory(event){
    event.preventDefault();

    const statusCategoryInput = document.querySelector(".category-input").value;

    if(document.querySelector(".category-input").value != ""){

    const statusCategoryEl = document.createElement("div");
    statusCategoryEl.classList.add("removable");
    statusCategoryEl.classList.add("category-div");

        // Changes background and shows delete button
        statusCategoryEl.onmouseover = function(){
            statusCategoryEl.style.backgroundColor = "#5FAA95";
            const catExitBtn = statusCategoryEl.querySelector("img");
            catExitBtn.style.visibility = "visible"; 
            statusCategoryEl.addEventListener('click', deleteCategory);
        }

        statusCategoryEl.onmouseout = function(){
            statusCategoryEl.style.backgroundColor = "#6ABEA7";
            const catExitBtn = statusCategoryEl.querySelector("img");
            catExitBtn.style.visibility = "hidden"; 
          
        }

    statusCategoryEl.innerHTML = `<h5>${statusCategoryInput}</h5>
                                <button class="delete-category-btn delete-btn">
                                <img src="images/exit-black.svg">
                                </button>`;

    chosenCategory.push (statusCategoryEl.querySelector("h5").innerHTML);

    categoriesDiv.appendChild(statusCategoryEl);

    document.querySelector(".category-input").value = "";

    }else {
        document.querySelector(".category-input").setAttribute('placeholder','You must define a status-category name !');
        }
    }

// Deleting unwanted
function deleteCategory(event){
        event.preventDefault();
       itemsToBeRemoved.push(this.querySelector("h5").innerHTML);
       this.remove(0);
}



// getting the background-color of the clicked color-box
function chooseProjectColor(){

    const style = getComputedStyle(this);
    chosenColor = style.backgroundColor;
    
}