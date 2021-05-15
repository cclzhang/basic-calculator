

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
    calcApp.nums.push(parseFloat(calcApp.curNum));
    console.log(calcApp.nums, calcApp.operators);

    calcApp.calculate(calcApp.nums, calcApp.operators);
    calcApp.result = calcApp.calculate(calcApp.nums, calcApp.operators);

    console.log(calcApp.display.textContent);
    
    // show result
    calcApp.display.textContent = calcApp.result;
    calcApp.curNum = calcApp.result;
    
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
    // console.log(calcApp.curNum);
    
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
    console.log(calcApp.nums);
    // console.log(calcApp.operators);
    
    if (calcApp.curNum === 'r') {
      return;
    }

    calcApp.clearBtn.textContent = 'C';

    let curDisplay = calcApp.display.textContent.split(" ");

    // if string number is already a negative
    if (calcApp.curNum[0] === '-') {
      calcApp.curNum = calcApp.curNum.substring(1);

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
        console.log('multiplying!');
        curDisplay.splice(-2);
        let newDisplay = curDisplay.join(" ");
        calcApp.display.textContent = newDisplay + " - " + calcApp.curNum;
      } else if (calcApp.operators[calcApp.operators.length - 1] === "-") {
        console.log('multiplying!');
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


    
    // console.log(calcApp.display.textContent)
    // let curDisplay = calcApp.display.textContent.split(" ");
    // curDisplay.splice(-2);
    // let newDisplay = curDisplay.join(" ");
    // console.log(newDisplay + " ⁻ " + calcApp.curNum);



  } else if (this.className === 'mathSymbol') {
  // if + - × ÷ was clicked
    calcApp.clearBtn.textContent = 'C';
    
    let lastIndex = calcApp.display.textContent.length - 1;
    // console.log(calcApp.display.textContent[lastIndex]);
    
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
      console.log('working?')
      calcApp.nums.push(0);
    } else if (calcApp.curNum) {
      calcApp.nums.push(parseFloat(calcApp.curNum));
    } 
    
    // console.log(calcApp.nums, calcApp.operators);
    calcApp.operators.push(btnClicked);

    calcApp.curNum = "";
    console.log(calcApp.nums, calcApp.operators);
  } else if (!action || action === 'decimal') {
  // if a number button or the decimal button is clicked
    calcApp.clearBtn.textContent = 'C';
    let lastIndex = calcApp.display.textContent.length - 1;
    // if string currently displayed is not '0' OR the decimal btn is clicked
    if (action && calcApp.isDecimal) {
      return;
    }
    
    if (calcApp.display.textContent[lastIndex] === '%') {
      console.log('hi');
      calcApp.curNum = btnClicked;
      let curDisplay = calcApp.display.textContent.split(" ");
      curDisplay.splice(-1);
      let newDisplay = curDisplay.join(" ");
      calcApp.display.textContent = newDisplay + " " + btnClicked;

    } else if (calcApp.curNum === 'r' && !action || calcApp.curNum === calcApp.result) {
      // change curNum to <button> content
      calcApp.curNum = btnClicked;
      calcApp.display.textContent = btnClicked;
      console.log(calcApp.curNum);

    } else if (action && calcApp.curNum === 'r') {
        calcApp.isDecimal = true;
        calcApp.curNum = '0' + btnClicked;
        calcApp.display.textContent += btnClicked;

    } else if (action && !calcApp.curNum) {
        calcApp.isDecimal = true;
        calcApp.curNum = '0' + btnClicked;
        calcApp.display.textContent += "0" + btnClicked;
        console.log(calcApp.curNum);

    } else {
      // change curNum to 'curNum' + '<button> content'
      calcApp.curNum += btnClicked;
      calcApp.display.textContent += btnClicked;

      console.log(calcApp.curNum);
    }
  }
}

calcApp.changeTheme = function(){
  const background = document.getElementsByTagName("main")[0];
  const heading = document.getElementsByTagName("h1")[0];
  const numDisplay = document.getElementsByClassName("display")[0];

  console.log(numDisplay);
  if (this.className === 'sun'){
    console.log(this);
    this.innerHTML = `
    <img src="./assets/moon.png" alt="a simple moon icon">
    `;
  } else {
    console.log(this);
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
      console.log('sun or moon');
      btn.addEventListener('click', calcApp.changeTheme);
    } else {
      btn.addEventListener('click', calcApp.clickHandler);
    }
  }
}

calcApp.calculate = function(num, op){
  let result = num[0];
  for (i = 0; i < op.length; i++){
    switch (op[i]) {
      case "+": result += num[i + 1]; break;
      case "-": result -= num[i + 1]; break;
      case "×": result *= num[i + 1]; break;
      case "÷": result /= num[i + 1]; break;
    } 
  }

  return result;
}

// calcApp.toDisplay = function (...items) {
//   calcApp.displayBox = items;
//   console.log(calcApp.displayBox);
// }

calcApp.print = function(){
  console.log('display string variable/array onto the page')
}


calcApp.init = function(){
  // html itmes
  calcApp.btns = document.getElementsByTagName('button');
  calcApp.display = document.getElementById('numShown');
  calcApp.clearBtn = document.querySelector('[data-action=clear]');
  
  // other variables
  calcApp.isDecimal = false;
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