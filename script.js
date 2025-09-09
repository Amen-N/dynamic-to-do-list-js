// To-Do List with localStorage persistence
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(taskText) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = function () {
      taskList.removeChild(li);

      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    };

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  function addTask(taskText = null, save = true) {
    let text = taskText === null ? taskInput.value.trim() : String(taskText).trim();

    if (text === '') {
      alert('Please enter a task');
      return;
    }

    tasks.push(text);
    createTaskElement(text);

    if (save) {
      saveTasks();
    }

    if (taskText === null) {
      taskInput.value = '';
    }
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = [];
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  addButton.addEventListener('click', () => addTask());

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });

  loadTasks();
});
