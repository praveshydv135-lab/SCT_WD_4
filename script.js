const todoForm = document.getElementById('todo-form');
const taskTitleInput = document.getElementById('task-title');
const taskDatetimeInput = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';

// Handle Form Submission
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const datetime = taskDatetimeInput.value;

  if (!title || !datetime) return;

  const newTask = {
    id: Date.now(),
    title,
    datetime,
    completed: false
  };

  tasks.push(newTask);
  todoForm.reset();
  renderTasks();
});

// Render Tasks based on Current Filter
function renderTasks() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const formattedDate = new Date(task.datetime).toLocaleString();

    li.innerHTML = `
      <div class="task-details">
        <span class="task-text">${task.title}</span>
        <span class="task-datetime">📅 ${formattedDate}</span>
      </div>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleComplete(${task.id})">
          ${task.completed ? 'Undo' : 'Done'}
        </button>
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Toggle Task Completion State
function toggleComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Edit Task Details
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newTitle = prompt('Edit task title:', task.title);
  if (newTitle === null || newTitle.trim() === '') return;

  const newDatetime = prompt('Edit date and time (YYYY-MM-DDTHH:MM):', task.datetime);
  if (newDatetime === null || newDatetime === '') return;

  task.title = newTitle.trim();
  task.datetime = newDatetime;
  renderTasks();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Handle Filter Buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderTasks();
  });
});
