
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
  else {
    unknownCommand(text); // Handle unknown commands
  }
}
function onDataReceived(text) {
  // Directly check for commands, allowing for some flexibility with whitespace or newlines
  const command = text.replace(/[\n\r]+$/, ''); // Remove trailing newlines or carriage returns

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

// The function to show the help text
function help() {
  console.log('Available commands:');
  console.log('  - quit: Exit the application');
  console.log('  - exit: Exit the application');
  console.log('  - hello: Print a greeting message');
  console.log('  - help: List all available commands');
}

