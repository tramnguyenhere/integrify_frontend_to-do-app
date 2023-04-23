const addTaskButton = document.getElementById('button--add-task');
const clearTasksButton = document.getElementById('button--clear-task');
const saveTaskButton = document.getElementById('button--save-task');

const addTaskForm = document.getElementById('form--add-task');

const taskList = document.getElementById('task-list');

const taskNameInput = document.getElementById('task__name');
const taskDeadlineInput = document.getElementById('task__deadline');
const taskStatusInput = document.getElementById('task__status');

let tasks = [
  {
    id: 1,
    title: 'hihi',
    deadline: 'Thursday 10 May',
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

saveTaskButton.addEventListener('click', () => {
  const taskName = taskNameInput.value.trim();
  const taskDeadline = taskDeadlineInput.value;
  const taskStatus = taskStatusInput.value;
  const taskId = tasks[-1].id + 1;

  if (taskName && !tasks.forEach((task) => task.title.includes(taskName))) {
    tasks.push({
      id: taskId,
      title: taskName,
      deadline: taskDeadline,
      status: taskStatus.value,
    });

    taskNameInput.value = '';
    taskDeadlineInput.value = '';
    taskStatusInput.value = 'not-started';
    addTaskForm.style.display = 'none';

    renderTasks();
  } else {
    taskNameInput.value = '';
    alert('Please retype the title!');
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
      const newTaskName = prompt('Enter new title:', task.title);
      if (newTaskName && newTaskName.trim() !== '') {
        task.title = newTaskName.trim();
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

    taskTitleElement.classList.add('task__title');
    taskDeadlineElement.classList.add('task__deadline');

    taskTitleElement.textContent = task.title;
    taskDeadlineElement.textContent = task.deadline;
    taskElement.id = task.id;

    if (task.status === 'not-started') {
      taskElement.classList.add('task--not-started');
    } else if (task.status === 'done') {
      taskElement.classList.add('task--done');
    } else {
      taskElement.classList.add('task--in-progress');
    }

    taskElement.appendChild(taskTitleElement);
    taskElement.appendChild(taskDeadlineElement);
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

console.log(tasks);
