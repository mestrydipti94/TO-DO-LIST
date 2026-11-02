let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let input = document.querySelector("#input");
let btn = document.querySelector("button");
let tasklist = document.querySelector("#task-list");

// Save tasks in Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    tasklist.innerHTML = "";

    tasks.forEach(function (task, index) {

        let list = document.createElement("li");
        let tasktext = document.createElement("span");
        let delbtn = document.createElement("button");
        let check = document.createElement("input");

        // Checkbox
        check.type = "checkbox";
        check.checked = task.completed;
        check.classList.add("task-check");

        // Task text
        tasktext.textContent = task.text;

        if (task.completed) {
            tasktext.classList.add("completed");
        }

        // Delete button
        delbtn.textContent = "delete";
        delbtn.classList.add("delbtn");

        // Append elements
        list.appendChild(check);
        list.appendChild(tasktext);
        list.appendChild(delbtn);

        tasklist.appendChild(list);

        // Mark task as completed
        check.addEventListener("change", function () {
            tasks[index].completed = check.checked;

            saveTasks();
            displayTasks();
        });

        // Delete task
        delbtn.addEventListener("click", function () {
            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });

    });
}

// Add new task
btn.addEventListener("click", function () {

    if (input.value.trim() === "") {
        return;
    }

    tasks.push({
        text: input.value.trim(),
        completed: false
    });

    saveTasks();

    input.value = "";

    displayTasks();
});

// Display saved tasks when page loads
displayTasks();