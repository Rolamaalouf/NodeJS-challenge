
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
function startApp(name){
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
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  console.log('Received text:', text);  // Log the received text to see its exact content
    const command = text.trim();
  
    if (command === 'quit') {
      quit();
    }
    else if (command === 'hello') {
      hello();
    }
    else {
      unknownCommand(text);
    }
  }

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Rola Maalouf")
function onDataReceived(text) {
  // Clean up the input by removing any unnecessary whitespace or newline characters
  const command = text.trim();

  // Check if the command is "quit" or "exit"
  if (command === 'quit' || command === 'exit') {
    quit(); // Call the quit function
  }
  else if (command === 'hello') {
    hello(); // Call the hello function
  }
  else if (command === 'help') {
    help(); // Call the help function
  }
  else {
    unknownCommand(text); // Handle unknown commands
  }
}
// The help function is designed to provide users with a list of available commands that they can use within your app. 

// The function to show the help text
function help() {
  console.log('Available commands:');
  console.log('  - quit: Exit the application');
  console.log('  - exit: Exit the application');
  console.log('  - hello: Print a greeting message');
  console.log('  - help: List all available commands');
  console.log('  - add [task]: Add a new task');
  console.log('  - remove [index]: Remove a task by its number (e.g., "remove 1" removes the first task, "remove" removes the last task)');
}
  // Pre-populated tasks
  const tasks = [
    "Buy groceries",
    "Clean the house",
    "Write some code",
    "Read a book"
  ];
  
function onDataReceived(text) {
  // Clean up the input by removing any unnecessary newlines or extra spaces
  const cleanedText = text.replace(/[\n\r]+$/, '').trim();
  
  // Split the cleaned text into words
  const parts = cleanedText.split(/\s+/);  // Split by any whitespace
  
  // Extract the first word (command)
  const command = parts[0];
  
  // Handle "quit" or "exit" commands
  if (command === 'quit' || command === 'exit') {
    quit(); // Call the quit function
  }
  // Handle "hello" command with or without an argument
  else if (command === 'hello') {
    // If there is a second word (argument), say hello to it
    const name = parts.length > 1 ? parts.slice(1).join(' ') : '';
    hello(name); // Call the hello function with the argument (or empty string)
  }
  // Handle "help" command
  else if (command === 'help') {
    help(); // Call the help function
  }
      // Handle "list" command
      else if (command === 'list') {
        listTasks(); // Call the list function to show all tasks
      }
       // Handle "add" command
  else if (command === 'add') {
    addTask(parts.slice(1).join(' ')); // Pass the remaining part as the task description
  }
  else {
    unknownCommand(text); // Handle unknown commands
  }
  if (command === 'remove') {
    if (parts.length > 1) {
      // If an argument is provided, parse it as an index
      const index = parseInt(parts[1]);
      if (!isNaN(index)) {
        removeTask(index);  // Call the removeTask function with the index
      } else {
        console.log('Error: Invalid task number.');
      }
    } else {
      removeTask();  // Call removeTask without an index to remove the last task
    }
  }
  // Handle other commands...
}


// The function to greet with or without an argument
function hello(name) {
  if (name) {
    console.log(`Hello ${name}!`);
  } else {
    console.log('Hello!');
  }
}

// The function to show the help text
function help() {
  console.log('Available commands:');
  console.log('  - quit: Exit the application');
  console.log('  - exit: Exit the application');
  console.log('  - hello [name]: Greet the person with the name');
  console.log('  - list: List all tasks');
  console.log('  - help: List all available commands');
}


function unknownCommand(text) {
  console.log('Unknown command:', text);
}
  // Function to list all tasks
  function listTasks() {
    if (tasks.length === 0) {
      console.log('No tasks available.');
    } else {
      console.log('List of tasks:');
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`); // Display task number and task
      });
    }
  }
  // Function to add a new task
function addTask(task) {
  if (task) {
    tasks.push(task); // Add the task to the list
    console.log(`Task added: "${task}"`);
  } else {
    console.log('Error: You must provide a task description after "add".');
  }
}
// Function to remove a task based on the index or remove the last task
function removeTask(index) {
  if (index === undefined) {
    // If no index is provided, remove the last task
    if (tasks.length > 0) {
      const removedTask = tasks.pop();
      console.log(`Removed task: "${removedTask}"`);
    } else {
      console.log('Error: No tasks to remove.');
    }
  } else {
    // If an index is provided, remove the task at that index (1-based index)
    const taskIndex = index - 1;  // Convert to 0-based index
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      const removedTask = tasks.splice(taskIndex, 1);
      console.log(`Removed task: "${removedTask[0]}"`);
    } else {
      console.log('Error: Invalid task number.');
    }
  }
}

