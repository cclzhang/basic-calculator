

const calcApp = {};

calcApp.clickHandler = function(){

  let btnClicked = this.textContent;
  let action = this.dataset.action;

  // display cap is 30
  if (calcApp.curNum.length >= 30) {
    return;
  }
  
  // newly inputted numbers are always shown
  if (calcApp.display.scrollWidth > calcApp.display.clientWidth) {
    calcApp.display.scrollLeft = calcApp.display.scrollWidth;
  }
  

  // if AC button is clicked
  if (action === 'clear') {

    if (this.textContent === 'C'){
      let curDisplay = calcApp.display.textContent.split(" ");

      if (curDisplay[curDisplay.length - 1]){
        curDisplay.splice(-1);
        calcApp.curNum = "";
      } else{
        curDisplay.splice(-2);
        calcApp.operators.pop();
      }

      let newDisplay = curDisplay.join(" ");
      calcApp.display.textContent = newDisplay + " ";
      this.textContent = 'AC';

    } else {
      calcApp.curNum = "r";
      calcApp.nums = [];
      calcApp.operators = [];
      calcApp.display.textContent = '0';
    }

  } else if (action === 'calculate') {
  // if = button is clicked
<<<<<<< HEAD
    calcApp.nums.push(parseFloat(calcApp.curNum));
=======
  
    if (calcApp.display.textContent[calcApp.display.textContent.length - 2] === ("+" || "-" || "×" || "÷")) {
      calcApp.operators.pop();
    } else {
      calcApp.nums.push(parseFloat(calcApp.curNum));
    }
>>>>>>> final-fixes
    
    calcApp.result = calcApp.calculate(calcApp.nums, calcApp.operators);

    if (calcApp.result.toString().includes(".") && calcApp.result.toString().split(".")[1].length > 7) {
      if (calcApp.result < 0) {
        const toDisplay = "⁻" + Math.abs(calcApp.result.toFixed(5));
        calcApp.display.textContent = toDisplay;

      } else {
        calcApp.display.textContent = calcApp.result.toFixed(5);
      }
    } else {
      if (calcApp.result < 0) {
        calcApp.display.textContent = "⁻" + Math.abs(calcApp.result);

      } else {
        calcApp.display.textContent = calcApp.result;
      }
    }
    

    // show result
    calcApp.curNum = calcApp.result.toString();
    
    // clear
    calcApp.nums = [];
    calcApp.operators = [];
    calcApp.clearBtn.textContent = 'AC';

  } else if (action === 'percent') {
  // if % button is clicked
    calcApp.clearBtn.textContent = 'C';

    if (calcApp.curNum === 'r') {
      calcApp.curNum = 0;
    }

    if (!calcApp.curNum) {
      return;
    }
    
    // change curNum and dpNum to their percent equivalents
    let newPercentNum = calcApp.curNum/Math.pow(100,1);
    calcApp.curNum = newPercentNum;
    let dpPercentNum = calcApp.curNum * Math.pow(100, 1);

    let lastIndex = calcApp.display.textContent.length - 1;

    
    // if displayed num has no percent add a percent to the display
    if (calcApp.display.textContent[lastIndex] !== '%') {
      calcApp.display.textContent += btnClicked;

    } else if (calcApp.display.textContent[lastIndex] === '%') {
      // if displayed num already has a percent, show current dp num moved by 2 decimal places
      let curDisplay = calcApp.display.textContent.split(" ");
      curDisplay.splice(-1);
      let newDisplay = curDisplay.join(" ");

      if (calcApp.curNum < 0 && (calcApp.operators[calcApp.operators.length - 1] !== "-" || calcApp.operators[calcApp.operators.length - 1] !== "+")) {
        dpPercentNum = Math.abs(dpPercentNum);
        calcApp.display.textContent = newDisplay + " ⁻" + dpPercentNum + btnClicked;
      } else {
        calcApp.display.textContent = newDisplay + " " + dpPercentNum + btnClicked;
      }
    }
    
  } else if (action === 'plusMinus') {
  // if +/- btn is clicked
    
    if (calcApp.curNum === 'r') {
      return;
    }

    calcApp.clearBtn.textContent = 'C';

    let curDisplay = calcApp.display.textContent.split(" ");

    // if string number is already a negative
    if (calcApp.curNum[0] === '-' || calcApp.curNum < 0) {
      if (calcApp.curNum[0] === '-') {
        calcApp.curNum = calcApp.curNum.substring(1);
      } else {
        calcApp.curNum = Math.abs(calcApp.curNum);
      }

      if (calcApp.operators[calcApp.operators.length - 1] === "+") {
        curDisplay.splice(-2);
        let newDisplay = curDisplay.join(" ");
        calcApp.display.textContent = newDisplay + " + " + calcApp.curNum;
      } else if (calcApp.operators[calcApp.operators.length - 1] === "-"){
        curDisplay.splice(-2);
        let newDisplay = curDisplay.join(" ");
        calcApp.display.textContent = newDisplay + " - " + calcApp.curNum;
      } else {
        curDisplay.splice(-1);
        let newDisplay = curDisplay.join(" ");
        calcApp.display.textContent = newDisplay + " " + calcApp.curNum;
      }
      
    } else {
      if (calcApp.operators[calcApp.operators.length - 1] === "+") {
        curDisplay.splice(-2);
        let newDisplay = curDisplay.join(" ");
        calcApp.display.textContent = newDisplay + " - " + calcApp.curNum;
      } else if (calcApp.operators[calcApp.operators.length - 1] === "-") {
        curDisplay.splice(-2);
        let newDisplay = curDisplay.join(" ");
        calcApp.display.textContent = newDisplay + " + " + calcApp.curNum;
      } else {
        curDisplay.splice(-1);
        let newDisplay = curDisplay.join(" ");
        calcApp.display.textContent = newDisplay + " ⁻" + calcApp.curNum;
      } 
      calcApp.curNum = '-' + calcApp.curNum;
    }

<<<<<<< HEAD
=======


>>>>>>> final-fixes
  } else if (this.className === 'mathSymbol') {
  // if + - × ÷ was clicked
    calcApp.clearBtn.textContent = 'C';
    
    let lastIndex = calcApp.display.textContent.length - 1;
    
    if (calcApp.display.textContent[lastIndex] === " ") {
      // if displayed num already has a percent, show current dp num moved by 2 decimal places
      let curDisplay = calcApp.display.textContent.split(" ");
      curDisplay.splice(-2);
      let newDisplay = curDisplay.join(" ");
      calcApp.display.textContent = newDisplay + " " + btnClicked + " ";

      calcApp.operators.pop();
    } else {
      
      calcApp.display.textContent += " " + this.textContent + " ";
    }
    
    if (calcApp.curNum === 'r' || calcApp.curNum === 0){
      calcApp.nums.push(0);
    } else if (calcApp.curNum) {
      calcApp.nums.push(parseFloat(calcApp.curNum));
    } 
    
    calcApp.operators.push(btnClicked);

    calcApp.curNum = "";
<<<<<<< HEAD
=======

>>>>>>> final-fixes
  } else if (!action || action === 'decimal') {
  // if a number button or the decimal button is clicked
    calcApp.clearBtn.textContent = 'C';
    let lastIndex = calcApp.display.textContent.length - 1;

    if ((btnClicked === '.' && calcApp.display.textContent[lastIndex] === '%') || (calcApp.curNum.includes(".") && btnClicked === '.')) {
      return;
    }

    // check if percented
    if (calcApp.display.textContent[lastIndex] === '%') {
      calcApp.curNum = btnClicked;
      let curDisplay = calcApp.display.textContent.split(" ");
      curDisplay.splice(-1);
      let newDisplay = curDisplay.join(" ");
      calcApp.display.textContent = newDisplay + " " + btnClicked;
      
    } else if (calcApp.curNum === 'r' && !action || calcApp.curNum === calcApp.result) {
      // check if curNum is original or result and decimal is not clicked 

      // change curNum to <button> content
      calcApp.curNum = btnClicked;
      calcApp.display.textContent = btnClicked;
      
    } else if (action && calcApp.curNum === 'r' || (action && calcApp.curNum === '0')) {
      // check if decimal is clicked and num is zero

      // if string currently displayed is not '0' OR the decimal btn is clicked
      calcApp.curNum = '0' + btnClicked;
      calcApp.display.textContent += btnClicked;

    } else if (action && !calcApp.curNum) {
      // check if decimal is clicked and curNum is empty

      calcApp.curNum = '0' + btnClicked;
      calcApp.display.textContent += "0" + btnClicked;

    } else {
<<<<<<< HEAD

      // change curNum to 'curNum' + '<button> content'
      calcApp.curNum += btnClicked;
      calcApp.display.textContent += btnClicked;
=======
        calcApp.curNum += btnClicked;
        calcApp.display.textContent += btnClicked;
>>>>>>> final-fixes
    }
  }
}

calcApp.changeTheme = function(){
  const background = document.getElementsByTagName("main")[0];
  const heading = document.getElementsByTagName("h1")[0];
  const numDisplay = document.getElementsByClassName("display")[0];

  if (this.className === 'sun'){
    this.innerHTML = `
    <img src="./assets/moon.png" alt="a simple moon icon">
    `;
  } else {
    this.innerHTML = `
    <img src="./assets/sun.svg" alt="a simple sun icon">
    `;
  }

  this.classList.toggle("sun");
  this.classList.toggle("moon");
  background.classList.toggle("day");
  heading.classList.toggle("day");
  numDisplay.classList.toggle("day");
}

// listen for button clicks
calcApp.btnFunc = function(){
  for (btn of calcApp.btns) {
    if (btn.className === 'sun' || btn.className === 
    'moon') {
      btn.addEventListener('click', calcApp.changeTheme);
    } else {
      btn.addEventListener('click', calcApp.clickHandler);
    }
  }
}

calcApp.miniCalculate = function(num, op){
  let result = num[0];
  for (let i = 0; i < op.length; i++){
    switch (op[i]) {
      case "+": result += num[i + 1]; break;
      case "-": result -= num[i + 1]; break;
      case "×": result *= num[i + 1]; break;
      case "÷": result /= num[i + 1]; break;
    } 
  }

  return result;
}

const testNums = [0.01, 2.3, -3.6, 4.2, 0.00005, -6, 7, -8, 9];
const testOps = ["+", "-", "×", "÷", "×", "-", "×", "÷"]

calcApp.calculate = function (num, op){
  let startIndex = null;
  let endIndex = null;

  let finalNum = [];
  let finalOp = [];

  let isTracking = false;

  // loop through operators array
  for (let i = 0; i < op.length; i++){
    if (op[i] === "×" || op[i] === "÷"){
      if(!isTracking) {
        startIndex = i;
        isTracking = true;
      } 

      if (i === op.length - 1) {
        endIndex = i + 1;
        isTracking = false;
        const newOp = op.slice(startIndex, endIndex);
        const newNums = num.slice(startIndex, (endIndex + 1));

        finalNum.push(calcApp.miniCalculate(newNums, newOp));
      }
    } else {
      // if current op is + or -
      if(isTracking) {
        endIndex = i;
        isTracking = false;
        const newOp = op.slice(startIndex, endIndex);
        const newNums = num.slice(startIndex, (endIndex + 1));

        finalNum.push(calcApp.miniCalculate(newNums, newOp));

      } else {
        finalNum.push(num[i]);
      }
      finalOp.push(op[i]);
    }
    
  }
  
  if (op[op.length - 1] === "+" || op[op.length - 1] === "-") {
    finalNum.push(num[num.length - 1]);
  }
  
  return calcApp.miniCalculate(finalNum, finalOp);
<<<<<<< HEAD

=======
>>>>>>> final-fixes
}


calcApp.init = function(){
  // html itmes
  calcApp.btns = document.getElementsByTagName('button');
  calcApp.display = document.getElementById('numShown');
  calcApp.clearBtn = document.querySelector('[data-action=clear]');
  
  // other variables
  calcApp.curNum = 'r';

  calcApp.nums = [];
  calcApp.operators = [];

  // calcApp.result = 'r';
  
  // call functions
  calcApp.btnFunc();

  calcApp.dpArray = calcApp.nums.map((value) => {
    return value;
  });

}

calcApp.init();