getTasksAndHeaderFromLocalStorage();

const button = document.getElementById("addTaskButton");

button.addEventListener("click", createTask);

function createTask() {
    let inputAmount = document.querySelectorAll(".task");

    if (inputAmount.length > 14) {
        window.alert("Max amount of inputs reached, you can fit no more.");
        return;
    }
    
    let blurContainer = document.createElement("div");
    let taskContainer = document.createElement("div");
    let exitButton = document.createElement("button");
    let taskHeader = document.createElement("p");
    let taskText = document.createElement("input");
    let addButton = document.createElement("button");
    blurContainer.id = "blurContainer";
    taskContainer.id = "taskContainer";
    exitButton.id = "exitButton";
    taskHeader.id = "taskHeader";
    taskText.id = "taskText";
    addButton.id = "addButton";
    exitButton.textContent = "X";
    taskHeader.textContent = "You may create a task here!";
    taskText.setAttribute("type", "text");
    taskText.setAttribute("placeholder", "write your task here");
    addButton.textContent = "Add task";

    document.body.appendChild(blurContainer);
    blurContainer.appendChild(taskContainer);
    taskContainer.appendChild(exitButton);
    taskContainer.appendChild(taskHeader);
    taskContainer.appendChild(taskText);
    taskContainer.appendChild(addButton);

    
    addButton.addEventListener("click", () => {
        let currentTaskNumber = localStorage.length;
        let header = document.getElementById("header");
        
        if (localStorage.getItem("header")) currentTaskNumber--;

        if (header.value && !localStorage.getItem("header")) {
            localStorage.setItem("header", header.value);
        }

        addTask(taskText.value);
        localStorage.setItem(`task${currentTaskNumber}`, taskText.value);
        currentTaskNumber++;
        taskText.value = "";
    })


    exitButton.addEventListener("click", () => {
        taskContainer.remove();
        blurContainer.remove();
    })
}

function addTask (text) {

    const taskContainer = document.getElementById("tasksContainer");
    let newTask = document.createElement("p");
    newTask.classList.add("task");

    console.log(text);
    if (text) {
        newTask.textContent = text;
    }

    taskContainer.appendChild(newTask);
}

function getTasksAndHeaderFromLocalStorage() {
    let storedTaskAmount = localStorage.length;
    let header = localStorage.getItem("header")

    if (header) {
        let DOMheader = document.getElementById("header");
        DOMheader.value = header;
    }
    
    for (let i = 0; i < storedTaskAmount; i++) {
        let task = localStorage.getItem(`task${i}`);
        if (task) {
            addTask(task);
        }
    }
}