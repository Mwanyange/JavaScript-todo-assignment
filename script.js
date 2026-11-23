// 1. Select HTML elements

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");


// 2. Create an array to store tasks

let tasks = [];


// 3. Create a function to display tasks

function displayTasks() {

    // Remove the old displayed tasks
    taskList.innerHTML = "";

    // Loop through all tasks
    tasks.forEach(function(task, index) {

        // Create a list item
        const listItem = document.createElement("li");

        // Create a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = task.name;
        taskText.classList.add("task-text");

        // Check whether the task is completed
        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Complete or uncomplete a task
        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            displayTasks();

        });

        // Delete a task
        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();

        });

        // Add elements to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        // Add the list item to the webpage
        taskList.appendChild(listItem);

    });

    // Update the total number of tasks
    taskCount.textContent = tasks.length;

    // Show message when there are no tasks
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

}


// 4. Create a function to add tasks

function addTask() {

    // Get the value entered by the user
    const taskName = taskInput.value.trim();

    // Validate the input
    if (taskName === "") {

        errorMessage.textContent = "Please enter a task!";

        return;

    } else {

        errorMessage.textContent = "";

    }

    // Add the task to the array
    tasks.push({

        name: taskName,
        completed: false

    });

    // Clear the input field
    taskInput.value = "";

    // Display the updated tasks
    displayTasks();

}


// 5. Add an event listener to the Add Task button

addButton.addEventListener("click", addTask);


// 6. Allow Enter key to add a task

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// 7. Clear all tasks

clearButton.addEventListener("click", function() {

    tasks = [];

    displayTasks();

});


// 8. Display the initial empty list

displayTasks();