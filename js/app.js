const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskForm = document.getElementById("task-form");
const dltComTask = document.getElementById("btn-dlt-completed");
const dltAllTask = document.getElementById("btn-dlt-all");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No hay tareas";
    emptyMessage.classList.add("empty-message");
    taskList.appendChild(emptyMessage);
    return;
  }
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      updateTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t !== task);

      updateTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  tasks.push({
    text: taskText,
    completed: false,
  });
  taskInput.value = "";
  updateTasks();
}
function deleteAllTask() {
  const confirmDelete = confirm(
    "¿Seguro que quieres eliminar todas las tareas?",
  );

  if (!confirmDelete) return;
  tasks = [];
  updateTasks();
}
function deleteCompleteTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateTasks();
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}
function updateTasks() {
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", addTask);
dltAllTask.addEventListener("click", deleteAllTask);
dltComTask.addEventListener("click", deleteCompleteTasks);
loadTasks();
