const addTaskButton = document.getElementById('button--add-task');
const clearTasksButton = document.getElementById('button--clear-task');
const cancelAddTaskButton = document.getElementById('button--cancel');
const confirmAddTaskButton = document.getElementById('button--confirm-task');
const deleteTaskButton = document.getElementById('button--delete-task');
const editTaskButton = document.getElementById('button--edit-task');

const addTaskForm = document.getElementById('form--add-task');
const editTaskForm = document.getElementById('form--edit-task');

const taskListDisplay = document.getElementById('task-list__container');
const taskList = document.getElementById('task-list');
const taskQuantity = document.getElementById('task__quantity');

const taskTitleInput = document.getElementById('task__title');
const taskTitleEditInput = document.getElementById('task__title--edit');

const taskDeadlineInput = document.getElementById('task__deadline');
const taskDeadlineEditInput = document.getElementById('task__deadline--edit');

const taskStatusInput = document.getElementById('task__status');
const taskStatusEditInput = document.getElementById('task__status--edit');
const taskStatusEditSelect = document.getElementById('task__status--edit');
const taskStatusNotStartedOption = document.getElementById(
  'task__status__option--not-started'
);
const taskStatusDoneOption = document.getElementById(
  'task__status__option--done'
);
const taskStatusInProgressOption = document.getElementById(
  'task__status__option--in-progress'
);

let tasks = [
  {
    id: 1,
    title: 'Doing assignment 2',
    deadline: '2023-04-24',
    status: 'done',
  },
  {
    id: 2,
    title: 'Doing assignment 3',
    deadline: '2023-04-26',
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'Doing assignment 4',
    deadline: '2023-05-01',
    status: 'not-started',
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

    renderMainDisplay();
  } else {
    taskTitleInput.value = '';
    alert('Please enter a unique title!');
  }
});

taskList.addEventListener('click', (event) => {
  let selectedTask;
  if (event.target.tagName.toLowerCase() === 'li') {
    const taskIndex = event.target.id;
    selectedTask = tasks.find((task) => task.id == taskIndex);

    taskTitleEditInput.value = selectedTask.title;
    taskDeadlineEditInput.value = selectedTask.deadline;

    editTaskForm.style.display = 'flex';
    taskListDisplay.style.display = 'none';

    switch (selectedTask.status) {
      case 'not-started':
        taskStatusNotStartedOption.setAttribute('selected', 'selected');
        break;
      case 'done':
        taskStatusDoneOption.setAttribute('selected', 'selected');
      case 'in-progress':
        taskStatusInProgressOption.setAttribute('selected', 'selected');
    }

    deleteTaskButton.addEventListener('click', () => {
      event.preventDefault();
      tasks = tasks.filter((task) => task.id != taskIndex);

      renderMainDisplay();
    });

    editTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const newTitle = taskTitleEditInput.value.trim();
      const newDeadline = taskDeadlineEditInput.value;
      const newStatus = taskStatusEditSelect.value;

      if (newTitle !== '' || !tasks.some((task) => task.title === newTitle)) {
        selectedTask.title = newTitle;
        selectedTask.deadline = newDeadline;
        selectedTask.status = newStatus;
        renderMainDisplay();
        selectedTask = {};
      } else {
        taskTitleEditInput.value = '';
        alert('Please enter a unique title!');
      }
    });
  }
});

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
    taskDeadlineElement.textContent = `Deadline: ${dayFormat(task.deadline)} ${
      task.deadline
    }`;
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

const renderMainDisplay = () => {
  renderTasks();
  renderTaskSummary();
  taskListDisplay.style.display = 'block';
  editTaskForm.style.display = 'none';
  addTaskForm.style.display = 'none';
};

const dayFormat = (date) => {
  const dayOfWeek = new Date(date).getDay();

  switch (dayOfWeek) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    case 7:
      return 'Sunday';
    default:
      break;
  }
};

renderTasks();
renderTaskSummary();
