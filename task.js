// Wait for page to load.
document.addEventListener('DOMContentLoaded', function() {
  // Select the add button, task input and the form to be used later.
  const add = document.querySelector('#submit');
  const newTask = document.querySelector('#task');
  const taskForm = document.querySelector('#taskForm');
  
  let tasks = [];
  let taskCount = 0;
  getTasks();

  // Disable the add button by default.
  add.disabled = true;
  add.className = "button button-gray";

  // Listen for input to be typed into the input field.
  // If no character is typed in, then disable the add button.
  newTask.onkeyup = () => {
    if (newTask.value.length > 0) 
    {
      add.disabled = false;
      add.className = "button button-green";
    }
    else 
    {
      add.disabled = true;
      add.className = "button button-gray";
    }
  }

  // Listen for submission of form.
  taskForm.onsubmit = () => {
    // Find the task the user just submitted.
    const task = newTask.value;

    // Add the task.
    addTask(task);

    // Clear out input field.
    newTask.value = '';

    // Disable the add button again.
    add.disabled = true;
    add.className = "button button-gray";

    // Update and save the tasks.
    tasks[taskCount] = task;
    saveTasks();

    // Update the task count.
    taskCount++;
    
    // All done.
    return false;
  }

  document.addEventListener('click', event => {
    // Find what was clicked on.
    const element = event.target;

    // If delete button clicked on, then remove the corresponding task.
    if (element.className === 'button button-blue')
    {
      const parent = element.parentElement.parentElement;
      parent.style.animationPlayState = 'running';

      parent.addEventListener('animationend', () => {
        // Find deleted task.
        let text = parent.textContent;
        let data = text.substring(0, text.length - 6);
        let updatedTasks = [];
        let count = 0;
        
        // Remove deleted task from the task list.
        for (let i = 0; i < tasks.length; i++)
        {
          if (tasks[i] != data)
          {
            updatedTasks[count++] = tasks[i];
          }
        }

        // Update and save the tasks.
        tasks = updatedTasks;
        taskCount--;
        parent.remove();
        saveTasks();
      });
    }
  });

  function saveTasks()
  {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function getTasks()
  {
    if (localStorage.getItem('tasks'))
    {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      taskCount = tasks.length;

      for (let i = 0; i < taskCount; i++)
      {
        addTask(tasks[i]);
      }
    }
  }

  function addTask(task)
  {
    // Create a new task item for the new task and
    // add it to the div element contains the task list.
    const div = document.createElement('div');
    div.className = "div-item";
    div.innerHTML = task;

    const divButton = document.createElement('div');
    divButton.className = "div-button div-center";

    const button = document.createElement('button');
    button.className = "button button-blue";
    button.innerHTML = "Delete";

    divButton.append(button);
    div.append(divButton);
    document.querySelector('#task-div').append(div);
  }
});