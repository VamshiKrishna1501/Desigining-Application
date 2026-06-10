const apiUrl = 'http://127.0.0.1:5000';

async function fetchTasks() {
  const response = await fetch(`${apiUrl}/tasks`);
  const tasks = await response.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) return;
  await fetch(`${apiUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });
  input.value = '';
  fetchTasks();
}

async function deleteTask(index) {
  await fetch(`${apiUrl}/tasks/${index}`, {
    method: 'DELETE'
  });
  fetchTasks();
}

// Load tasks on page load
window.onload = fetchTasks;
