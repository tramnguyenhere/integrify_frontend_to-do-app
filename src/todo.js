const addTaskButton = document.getElementById('button--add-task');
const clearTasksButton = document.getElementById('button--clear-task');
const saveTaskButton = document.getElementById('button--save-task');

const addTaskForm = document.getElementById('form--add-task');

const taskList = document.getElementById('task-list');

const taskTitleInput = document.getElementById('task__title');
const taskDeadlineInput = document.getElementById('task__deadline');
const taskStatusInput = document.getElementById('task__status');

let tasks = [
  {
    id: 1,
    title: 'hihi',
    deadline: '2023-05-04',
    status: 'done',
  },
];

addTaskButton.addEventListener('click', () => {
  addTaskForm.style.display = 'block';
});

clearTasksButton.addEventListener('click', () => {
  tasks = [];
  renderTasks();
});

saveTaskButton.addEventListener('click', (event) => {
  event.preventDefault();
  const taskTitle = taskTitleInput.value.trim();
  const taskDeadline = taskDeadlineInput.value;
  const taskStatus = taskStatusInput.value;

  const lastTask = tasks[tasks.length - 1];
  const taskId = lastTask ? lastTask.id + 1 : 1;

  if (taskTitle && !tasks.some((task) => task.title === taskTitle)) {
    tasks.push({
      id: taskId,
      title: taskTitle,
      deadline: taskDeadline,
      status: taskStatus,
    });

    taskTitleInput.value = '';
    taskDeadlineInput.value = '';
    taskStatusInput.value = 'not-started';
    addTaskForm.style.display = 'none';

    renderTasks();
  } else {
    taskTitleInput.value = '';
    alert('Please enter a unique title!');
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'li') {
    const taskIndex = event.target.id;

    const task = tasks.filter((task) => task.id == taskIndex)[0];

    const taskActions = document.createElement('div');
    taskActions.innerHTML = `
            <button class="button--edit-task">Edit</button>
            <button class="button--delete-task">Delete</button>
        `;
    event.target.appendChild(taskActions);

    const editTaskButton = taskActions.querySelector('.button--edit-task');
    const deleteTaskButton = taskActions.querySelector('.button--delete-task');

    editTaskButton.addEventListener('click', () => {
      const newtaskTitle = prompt('Enter new title:', task.title);
      if (newtaskTitle && newtaskTitle.trim() !== '') {
        task.title = newtaskTitle.trim();
        renderTasks();
      }
    });

    deleteTaskButton.addEventListener('click', () => {
      tasks = tasks.filter((task) => task.id != taskIndex);
      renderTasks();
    });
  }
});

// Render tasks function
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    const taskTitleElement = document.createElement('p');
    const taskDeadlineElement = document.createElement('p');
    const taskStatusElement = document.createElement('div');

    taskTitleElement.classList.add('task__title');
    taskDeadlineElement.classList.add('task__deadline');

    taskTitleElement.textContent = task.title;
    taskDeadlineElement.textContent = task.deadline;
    taskElement.id = task.id;

    if (task.status === 'not-started') {
      taskStatusElement.classList.add('task--not-started');
    } else if (task.status === 'done') {
      taskStatusElement.classList.add('task--done');
    } else {
      taskStatusElement.classList.add('task--in-progress');
    }

    taskElement.appendChild(taskTitleElement);
    taskElement.appendChild(taskDeadlineElement);
    taskElement.appendChild(taskStatusElement);
    taskList.appendChild(taskElement);
  });

  if (tasks.length === 0) {
    clearTasksButton.style.display = 'none';
  } else {
    clearTasksButton.style.display = 'block';
  }
}

// Initial render
renderTasks();
