let currentTotal = 0 ;
let reader = `0`;
let previousOperator;

// set constant variables for class names
const screen = document.querySelector(`.screen`);

//action for buttons clicked
function buttonClicked(value){
  if(isNaN(value)){
    //value not a number execute function symbolholder
    symbolHolder(value);
  }else{
    //otherwise execute number holder function
    numberHolder(value);
  }
  screen.innerText = reader;
}

//Operators function, 
function symbolHolder(operator){
  switch(operator){
    // flushes reader screen and current total to 0 string and 0 total
    case `C`:
      reader = `0`;
      currentTotal = 0;
      break;
      // equivalent operation
    case `=`:
      // default state null or 0
      if(previousOperator === null){
        return
      }
      //runs case equivalent and equate the given number and operators
      flushOperation(parseInt(reader));
      previousOperator = null;
      reader = currentTotal;
      currentTotal = 0;
      break;
      // backspacing reduce string of reader length
    case `←`:
      if(reader.length === 1){
        reader = `0`;
      }else {
        reader = reader.substring(0, reader.length -1);
      }
      break;
      /* multiple cases which reads each case if value = true execute
      function solveEquation */
    case `+`:
    case `−`:
    case `×`:
    case `÷`:
      solveEquation(operator);
      break;
  }
}

function solveEquation(operator){
  if(reader === `0`){
    return;
  }
  // sets the value of reader = parseInt/number
  const intReader = parseInt(reader);

  //conditional statement 
  if(currentTotal === 0){
    currentTotal = intReader;
  }else{
    flushOperation(intReader);
  }
  //previous operator value = operator paramater
  previousOperator = operator;
  reader = `0`;
}

//solves the given number and continuously adds the given reader value + operator value
function flushOperation(intReader){
  if(previousOperator === `+`){
    currentTotal += intReader;
  }else if(previousOperator === `−`){
    currentTotal -= intReader;
  }else if(previousOperator === `×`){
    currentTotal *= intReader;
  }else if(previousOperator === `÷`){
    currentTotal /= intReader;
  }
}

// holds the number being clicked on the vent
function numberHolder(numberString){
  if(reader === `0`){
    reader = numberString;
  }else {
    reader += numberString;
  }
}

/*function for running the query selector automatically once the vent
click button listener happens*/
function run(){
  document.querySelector(`.ecal-buttons`).addEventListener(`click`,function(event){
    buttonClicked(event.target.innerText);
  })
}

run();


