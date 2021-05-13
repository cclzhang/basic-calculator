

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
    console.log(btnClicked);

    if (this.textContent === 'C'){
      calcApp.display.textContent = 'surprise'; 
      this.textContent = 'AC';
    } else {
      calcApp.curNum = "r";
      calcApp.nums = [];
      calcApp.operators = [];
      calcApp.display.textContent = '0';
    }

  // if = button is clicked
  } else if (action === 'calculate') {
    calcApp.nums.push(parseFloat(calcApp.curNum));
    console.log(calcApp.nums, calcApp.operators);

    calcApp.calculate(calcApp.nums, calcApp.operators);
    const result = calcApp.calculate(calcApp.nums, calcApp.operators);
    calcApp.display.textContent = result;
    calcApp.nums = [result];
    calcApp.curNum = 'r';

  // if % button is clicked
  } else if (action === 'percent') {
    console.log(btnClicked);

    calcApp.curNum = parseInt(calcApp.curNum)/Math.pow(100,1);

    if (!Number.isInteger(calcApp.curNum)) {
      calcApp.display.textContent += btnClicked;
    }
    
    // console.log('add percent', calcApp.curNum);

  // if +/- btn is clicked
  } else if (action === 'plusMinus') {
    console.log(btnClicked);
    // console.log(calcApp.operators);
    
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

  // if + - × ÷ was clicked
  } else if (this.className === 'mathSymbol') {
    console.log(btnClicked);

    calcApp.operators.push(btnClicked);

    // calcApp.dpOperators.push(btnClicked);
    calcApp.nums.push(parseFloat(calcApp.curNum));

    console.log(calcApp.nums, calcApp.operators);

    calcApp.display.textContent += " " + this.textContent + " ";
    calcApp.curNum = "";
      
  // if a number button or the decimal button is clicked
  } else if (!action || action === 'decimal') {

    // if string currently displayed is not '0' OR the decimal btn is clicked
    if (calcApp.curNum === 'r' && !action) {
      // change curNum to <button> content
      calcApp.curNum = btnClicked;
      calcApp.display.textContent = btnClicked;
      calcApp.clearBtn.textContent = 'C';

    } else {
      // change curNum to 'curNum' + '<button> content'
      calcApp.curNum += btnClicked;
      calcApp.display.textContent += btnClicked;

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
    if (op[i] === "+"){
      console.log('adding');
      console.log(result, op[i], num[i + 1]);
      // console.log(result + num[i + 1]);

      result = num[i] + num[i + 1];
      console.log(result);
    } else if (op[i] === "-"){
      console.log('minusing');
      console.log(result, op[i], num[i + 1]);

      // console.log(result - num[i + 1]);

      result -= num[i + 1];
      console.log(result);
    } else if (op[i] === "×") {
      console.log('multiplying');
      console.log(result, op[i], num[i + 1]);

      // console.log(result * num[i + 1]);

      result *= num[i + 1];
      console.log(result);
    } else if (op[i] === "÷") {
      console.log('dividing');
      console.log(result, op[i], num[i + 1]);

      // console.log(result / num[i + 1]);

      result /= num[i + 1];
      console.log(result);
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
  
  // other variables
  calcApp.curNum = 'r';
  calcApp.nums = [];
  calcApp.operators = [];
  // calcApp.dpOperators = [];
  calcApp.curOp = '';
  calcApp.clearBtn = document.querySelector('[data-action=clear]');
  
  // call functions
  calcApp.btnFunc();

  calcApp.dpArray = calcApp.nums.map((value) => {
    return value;
  });
}

calcApp.init();