// Get elements
const addTaskBtn = document.getElementById('button--add-task');
const clearTasksBtn = document.getElementById('button--clear-task');
const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('form--add-task');
const taskNameInput = document.getElementById('task__name');
const saveTaskBtn = document.getElementById('button--save-task');

// Define tasks array
let tasks = [
  {
    title: 'hihi',
    completed: false,
  },
];

// Add event listeners
addTaskBtn.addEventListener('click', () => {
  addTaskForm.style.display = 'block';
});

clearTasksBtn.addEventListener('click', () => {
  tasks = [];
  renderTasks();
});

saveTaskBtn.addEventListener('click', () => {
  const taskName = taskNameInput.value.trim();
  if (taskName) {
    tasks.push({
      title: taskName,
      completed: false,
    });
    taskNameInput.value = '';
    addTaskForm.style.display = 'none';
    renderTasks();
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'li') {
    const taskIndex = event.target.getAttribute('data-index');
    const task = tasks[taskIndex];

    const taskActions = document.createElement('div');
    taskActions.innerHTML = `
            <button class="button--edit-task">Edit</button>
            <button class="button--delete-task">Delete</button>
        `;
    event.target.appendChild(taskActions);

    const editTaskBtn = taskActions.querySelector('."button--edit-task');
    const deleteTaskBtn = taskActions.querySelector('.button--delete-task');

    editTaskBtn.addEventListener('click', () => {
      const newTaskName = prompt('Enter new title:', task.title);
      if (newTaskName && newTaskName.trim() !== '') {
        task.title = newTaskName.trim();
        renderTasks();
      }
    });

    deleteTaskBtn.addEventListener('click', () => {
      tasks.splice(taskIndex, 1);
      renderTasks();
    });
  }
});

// Render tasks function
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.title;
    taskElement.setAttribute('data-index', index);
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    taskList.appendChild(taskElement);
  });

  if (tasks.length === 0) {
    clearTasksBtn.style.display = 'none';
  } else {
    clearTasksBtn.style.display = 'block';
  }
}

// Initial render
renderTasks();
