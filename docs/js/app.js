//HTML objects




// Elements
var id = 0;
var projectMemberArray = [];

// EVENT LISTENERS


// Saving project id to local storage and opens project.html
function goToProjectPage(){

    event.preventDefault();

    id = this.id;
    const projectId = {id};

    const projectIdList = JSON.parse(window.localStorage.getItem("projectIdList")) || [];
    projectIdList.unshift(projectId);
    window.localStorage.setItem("projectIdList", JSON.stringify(projectIdList));
    
    window.location = "project.html";
}

// Renders project page with saved information in local storage
function renderProjectPage(){
    const projectIdList = JSON.parse(window.localStorage.getItem("projectIdList"));
    const currentProjectId = Object.values(projectIdList[0]);

    const projectList = JSON.parse(window.localStorage.getItem("projectList"));
    const currentProject = projectList[currentProjectId];

    const projectNameContainer = document.getElementById("project-page-header");
    projectNameContainer.innerHTML = "";

        const projectNameEl = document.createElement("div");
        projectNameEl.innerHTML = `<h1>${currentProject.projectName}</h1>`;
        projectNameContainer.appendChild(projectNameEl);

        projectNameContainer.style.backgroundColor = currentProject.projectColor;

        let fieldArray = Object.values(currentProject.statusCategory);
        
            const projectPageMain = document.getElementById("project-page-main");
        
            for(let  i = 0; i < fieldArray.length; i++){
        
               const columnDiv = document.createElement("div");
               
               columnDiv.classList.add("column-div");
        
               columnDiv.innerHTML += `<div class="column-title">
               <h3 class="dark-font">${fieldArray[i]} </h3>
           </div>
           <div class="column-content" ondragover="allowDrop(event)" ondrop="drop(event)">
            
               `;
        
               projectPageMain.appendChild(columnDiv);
            }
        
      }

      /*   ADD MEMBERS TO PROJECT AND TO ASSIGN MEMBER LIST   */

// Function: Render member list
 function renderMemberList() {

    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    const memberListEl = document.getElementById("dropdown-list");

    memberListEl.innerHTML = "";

    for( const member of memberList){
        const memberEl = document.createElement("div");
        memberEl.className = "member-div";

        const {name, image} = member;

        memberEl.innerHTML = `<div><img class="profile-img" src="${image}">${name}</div>`;

        memberListEl.appendChild(memberEl);

       // Skriv inn riktig klikk funksjon her
      memberEl.onclick = createNewProjectMember;
    }
 }

 // Function: Create new member
function createNewMember(event) {
    event.preventDefault();
    
    const name = document.querySelector("[name='name']").value;
    const image = document.querySelector("[name='image']").dataset.image;

    const member = {name, image};

    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];

    //Add members to project list
    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    projectList.push(member);
    
    memberList.push(member);
    window.localStorage.setItem("memberList", JSON.stringify(memberList));

    renderMemberList();
    event.target.reset(); 
}

// Function: New project team from dropdown
function createNewProjectMember() {
    const projectMemberListEl = document.getElementById("added-member-list");

    const image = this.querySelector("img").src;
    const name = this.querySelector("div").textContent;

    const projectMember = {name, image};

    projectMemberArray.push(projectMember);
    projectMemberListEl.innerHTML += `<div class="project-member-div"><img class="profile-img" src="${image}">${name}</div>`;
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

// Member drop down

function dropDownFunction(){
    document.getElementById("dropdown-list").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }