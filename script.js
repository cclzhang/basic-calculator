

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

    calcApp.display.textContent = calcApp.result;
    calcApp.nums = [];
    calcApp.operators = [];

    // clear
    calcApp.curNum = calcApp.result;
    calcApp.clearBtn.textContent = 'AC';
    
  } else if (action === 'percent') {
  // if % button is clicked

    console.log(btnClicked);
    calcApp.clearBtn.textContent = 'C';
    let newNum = calcApp.curNum/Math.pow(100,1);
    calcApp.curNum = newNum;
    let displayNum = calcApp.curNum * Math.pow(100, 1)

    if (calcApp.isPercent) {
      // calcApp.display.textContent = displayNum + btnClicked;
    } else {
      calcApp.display.textContent += btnClicked;
    }

    // console.log(calcApp.curNum, otherNum);
    // if (!Number.isInteger(calcApp.curNum)) {
    //   calcApp.display.textContent += btnClicked;
    // }

    console.log(calcApp.curNum);
    
    calcApp.isPercent = true;
  } else if (action === 'plusMinus') {
  // if +/- btn is clicked
    console.log(calcApp.nums);
    // console.log(calcApp.operators);
    calcApp.clearBtn.textContent = 'C';
    // if string number is already a negative
    if (calcApp.curNum[0] === '-') {
      calcApp.curNum = calcApp.curNum.substring(1);
      calcApp.curOp = '-';
    
    // if string number is positive
    } else {
      calcApp.curNum = '-' + calcApp.curNum;
      calcApp.curOp = '+';
    }

    /*
    // function to change the displayed operators
    function changeDpOperator(){
      if (calcApp.dpOperators.length < 1) {
        return;
      }

      const lastOp = calcApp.dpOperators.length - 1;

      if (calcApp.dpOperators[lastOp] === calcApp.curNum[0]) {
        calcApp.dpOperators.splice(lastOp, 1, '+')
        reprintOperator();
      } else if (calcApp.dpOperators[lastOp] === '÷' || calcApp.dpOperators[lastOp] === '×') {
        return;
      } else {
        calcApp.dpOperators.splice(lastOp, 1, '-');
        reprintOperator();
      }

      // console.log(calcApp.dpArray);

    // reprint the display with the operator changed visually
    function reprintOperator(){
      console.log(`real: ${calcApp.operators} | display: ${calcApp.dpOperators}`);
      // calcApp.display.textContent = ;
      // calcApp.dpOperators.map()
    }
    */



    // console.log(parseFloat(calcApp.curNum));

  } else if (this.className === 'mathSymbol') {
  // if + - × ÷ was clicked
    calcApp.clearBtn.textContent = 'C';
    calcApp.operators.push(btnClicked);

    if (calcApp.curNum) {
      calcApp.nums.push(parseFloat(calcApp.curNum));
    }

    // console.log(calcApp.nums, calcApp.operators);

    calcApp.display.textContent += " " + this.textContent + " ";
    calcApp.curNum = "";
      
  } else if (!action || action === 'decimal') {
  // if a number button or the decimal button is clicked
    calcApp.clearBtn.textContent = 'C';

    // if string currently displayed is not '0' OR the decimal btn is clicked
    if (action && calcApp.isDecimal) {
      return;
    }
    
    if (calcApp.curNum === 'r' && !action || calcApp.curNum === calcApp.result) {
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

// listen for button clicks
calcApp.btnFunc = function(){
  for (btn of calcApp.btns) {
    btn.addEventListener('click', calcApp.clickHandler);
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

  // if (result % 1 != 0 && ) {
  //   result = result.toFixed(3);
  // }

  const decimalCount = number => {
    // Convert to String
    const numStr = String(number);
    // String Contains Decimal
    if (numStr.includes('.')) {
      return numStr.split('.')[1].length;
    };
    // String Does Not Contain Decimal
    return 0;
  }

  if (decimalCount(result) > 3) {
    result = result.toFixed(3);
  }
  // console.log(calcApp.operators);
  // let array = calcApp.operators.splice(2, 3);
  // console.log(array);
  // console.log(calcApp.operators);

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
  // calcApp.dpOperators = [];
  calcApp.curOp = '';
  // calcApp.result = 'r';
  
  // call functions
  calcApp.btnFunc();

  calcApp.dpArray = calcApp.nums.map((value) => {
    return value;
  });
}

calcApp.init();