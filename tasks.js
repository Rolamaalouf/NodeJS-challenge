

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```bash
 * node tasks.js batata
 * ```
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  console.log('Received text:', text); // Log the received text to see its exact content
  const parts = text.trim().split(/\s+/);  // Split by any whitespace
  const command = parts[0];  // The first word is the command

  // Handle the commands
  if (command === 'quit' || command === 'exit') {
    quit(); // Exit the application
  } else if (command === 'hello') {
    hello(); // Greet the user
  } else if (command === 'help') {
    help(); // List available commands
  } else if (command === 'list') {
    listTasks(); // List all tasks
  } else if (command === 'add') {
    addTask(parts.slice(1).join(' ')); // Add a new task
  } else if (command === 'remove') {
    removeTask(parts.length > 1 ? parseInt(parts[1]) : undefined); // Remove a task
  } else if (command === 'edit') {
    editTask(parts[1] ? parseInt(parts[1]) : undefined, parts.slice(2).join(' ')); // Edit a task
  } else if (command === 'check' || command === 'uncheck') {
    const taskNumber = parts.length > 1 ? parseInt(parts[1]) : undefined; // Get task number from command
    toggleTaskStatus(command, taskNumber); // Call the new function to handle both
} else {
  unknownCommand(text); // Handle unknown commands
}
}
// Pre-populated tasks
let tasks = [
  { text: "Buy groceries", done: false },
  { text: "Clean the house", done: true },
  { text: "Write some code", done: false },
  { text: "Read a book", done: true }
];

/**
 * Prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('Unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello() {
  console.log('Hello!');
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!');
  process.exit();
}

/**
 * Shows the help text with all available commands
 *
 * @returns {void}
 */
function help() {
  console.log('Available commands:');
  console.log('  - quit: Exit the application');
  console.log('  - exit: Exit the application');
  console.log('  - hello: Print a greeting message');
  console.log('  - list: List all tasks');
  console.log('  - add [task]: Add a new task');
  console.log('  - remove [index]: Remove a task by its number');
  console.log('  - edit [index] [new text]: Edit a task at the given index');
  console.log('  - check [index]: Mark a task as done');
  console.log('  - uncheck [index]: Mark a task as not done');
}

/**
 * Lists all tasks
 *
 * @returns {void}
 */
function listTasks() {
  if (tasks.length === 0) {
    console.log('No tasks available.');
  } else {
    tasks.forEach((task, index) => {
      const status = task.done ? '[Done]' : '[Pending]';
      console.log(`${index + 1}. ${task.text} ${status}`);
    });
  }
}

/**
 * Adds a new task
 *
 * @param {string} task the task to add
 * @returns {void}
 */
function addTask(task) {
  if (task) {
    tasks.push({ text: task, done: false });
    console.log(`Task added: "${task}"`);
  } else {
    console.log('Error: You must provide a task description after "add".');
  }
}

/**
 * Removes a task based on the index
 *
 * @param {number} index the task index to remove
 * @returns {void}
 */
function removeTask(index) {
  if (index === undefined) {
    // Remove the last task if no index is provided
    if (tasks.length > 0) {
      const removedTask = tasks.pop();
      console.log(`Removed task: "${removedTask.text}"`);
    } else {
      console.log('Error: No tasks to remove.');
    }
  } else {
    const taskIndex = index - 1;  // Convert to 0-based index
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      const removedTask = tasks.splice(taskIndex, 1);
      console.log(`Removed task: "${removedTask[0].text}"`);
    } else {
      console.log('Error: Invalid task number.');
    }
  }
}

/**
 * Edits a task at a given index or the last task if no index is provided
 *
 * @param {number} index the task index to edit
 * @param {string} newText the new task text
 * @returns {void}
 */
function editTask(index, newText) {
  if (!newText) {
    console.log('Error: You must provide the new task text after "edit".');
    return;
  }

  if (index === undefined) {
    // Edit the last task if no index is provided
    if (tasks.length > 0) {
      tasks[tasks.length - 1].text = newText;  // Update the last task
      console.log(`Last task updated to: "${newText}"`);
    } else {
      console.log('Error: No tasks available to edit.');
    }
  } else {
    const taskIndex = index - 1;  // Convert to 0-based index
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks[taskIndex].text = newText;  // Update the task at the specified index
      console.log(`Task ${index} updated to: "${newText}"`);
    } else {
      console.log('Error: Invalid task number.');
    }
  }
}
function toggleTaskStatus(command, taskNumber) {
  if (taskNumber === undefined) {
    console.log(`Error: You must provide a task number after "${command}".`);
    return;
  }

  if (taskNumber >= 1 & taskNumber <= tasks.length) {
    const taskIndex = taskNumber - 1;
    
    if (command === 'check') {
      tasks[taskIndex].done = true;  // Mark the task as done
      console.log(`Task ${taskNumber} marked as done.`);
    } else if (command === 'uncheck') {
      tasks[taskIndex].done = false;  // Mark the task as not done
      console.log(`Task ${taskNumber} marked as not done.`);
    }
  } else {
    console.log('Error: Invalid task number.');
  }
}
// Start the application
startApp("Rola Maalouf");

