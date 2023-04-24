const addTaskButton = document.getElementById('button--add-task');
const clearTasksButton = document.getElementById('button--clear-task');
const cancelAddTaskButton = document.getElementById('button--cancel');
const confirmAddTaskButton = document.getElementById('button--confirm-task');

const addTaskForm = document.getElementById('form--add-task');
const taskListDisplay = document.getElementById('task-list__container');

const taskList = document.getElementById('task-list');
const taskQuantity = document.getElementById('task__quantity');
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
  {
    id: 2,
    title: 'hehe',
    deadline: '2023-05-04',
    status: 'in-progress',
  },
];

addTaskButton.addEventListener('click', () => {
  addTaskForm.style.display = 'flex';
  taskListDisplay.style.display = 'none';
});

clearTasksButton.addEventListener('click', () => {
  tasks = [];
  renderTasks();
  renderTaskSummary();
});

confirmAddTaskButton.addEventListener('click', (event) => {
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
    renderTaskSummary();

    addTaskForm.style.display = 'none';
    taskListDisplay.style.display = 'block';
  } else {
    taskTitleInput.value = '';
    alert('Please enter a unique title!');
  }
});

taskList.addEventListener('click', (event) => {
  let selectedTask;
  if (event.target.tagName.toLowerCase() === 'li') {
    const taskIndex = event.target.id;

    selectedTask = tasks.filter((task) => task.id == taskIndex)[0];
    console.log(selectedTask);

    // const taskActions = document.createElement('div');
    // taskActions.innerHTML = `
    //         <button class="button--edit-task">Edit</button>
    //         <button class="button--delete-task">Delete</button>
    //     `;
    // event.target.appendChild(taskActions);

    // const editTaskButton = taskActions.querySelector('.button--edit-task');
    // const deleteTaskButton = taskActions.querySelector('.button--delete-task');

    // deleteTaskHandler(deleteTaskButton, task, taskIndex);
    // editTaskHandler(editTaskButton, task);
  }
});

const editTaskHandler = (button, item) => {
  button.addEventListener('click', () => {
    const newtaskTitle = prompt('Enter new title:', item.title);
    if (newtaskTitle && newtaskTitle.trim() !== '') {
      item.title = newtaskTitle.trim();
      renderTasks();
    }
  });
};

const deleteTaskHandler = (button, item, index) => {
  button.addEventListener('click', () => {
    tasks = tasks.filter((task) => item.id != index);
    renderTasks();
    renderTaskSummary();
  });
};

const renderTasks = () => {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    const taskTitleElement = document.createElement('p');
    const taskDeadlineElement = document.createElement('p');
    const taskStatusElement = document.createElement('div');

    taskTitleElement.classList.add('task__title');
    taskDeadlineElement.classList.add('task__deadline');
    if (task.status === 'not-started') {
      taskStatusElement.classList.add('task--not-started');
    } else if (task.status === 'done') {
      taskStatusElement.classList.add('task--done');
    } else {
      taskStatusElement.classList.add('task--in-progress');
    }

    taskTitleElement.textContent = task.title;
    taskDeadlineElement.textContent = `Deadline: ${task.deadline}`;
    taskElement.id = task.id;

    taskElement.appendChild(taskStatusElement);
    taskElement.appendChild(taskTitleElement);
    taskElement.appendChild(taskDeadlineElement);
    taskList.appendChild(taskElement);
  });
};

const renderTaskSummary = () => {
  const taskLength = tasks.length;
  taskQuantity.textContent = `You have ${taskLength} ${
    taskLength > 1 ? 'tasks' : 'task'
  }`;

  if (tasks.length === 0) {
    clearTasksButton.style.display = 'none';
  } else {
    clearTasksButton.style.display = 'block';
  }
};

renderTasks();
renderTaskSummary();
