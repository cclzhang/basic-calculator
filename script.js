

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
    console.log(btnClicked);
    const result = calcApp.calculate();
    calcApp.display.textContent = result;
    calcApp.nums = [result];
    calcApp.curNum = 'r';

  // if % button is clicked
  } else if (action === 'percent') {
    calcApp.curNum = parseInt(calcApp.curNum)/Math.pow(100,1);

    if (!Number.isInteger(calcApp.curNum)) {
      calcApp.display.textContent += btnClicked;
    }
    
    console.log('add percent', calcApp.curNum);

  // if +/- btn is clicked
  } else if (action === 'plusMinus') {
    // console.log(calcApp.operators);
    
    // if string number is already a negative
    if (calcApp.curNum[0] === '-') {
      calcApp.curNum = calcApp.curNum.substring(1);
      calcApp.curOp = '-';
      changeDpOperator();
    
    // if string number is positive
    } else {
      calcApp.curNum = '-' + calcApp.curNum;
      calcApp.curOp = '+';
      changeDpOperator();
    }

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
    }

    // reprint the display with the operator changed visually
    function reprintOperator(){
      console.log(`real: ${calcApp.operators} | display: ${calcApp.dpOperators}`);
      // calcApp.display.textContent = ;
      // calcApp.dpOperators.map()
    }



    console.log(parseFloat(calcApp.curNum));

  // if + - × ÷ was clicked
  } else if (this.className === 'mathSymbol') {
    calcApp.operators.push(btnClicked);
    calcApp.dpOperators.push(btnClicked);
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
      console.log('hi')
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

calcApp.calculate = function(){
  return 2;
}

calcApp.add = function(n1, n2){
  return n1 + n2;
}

calcApp.subtract = function (n1, n2) {
  return n1 - n2;
}

calcApp.multiply = function (n1, n2) {
  return n1 * n2;
}

calcApp.divide = function (n1, n2) {
  return n1 / n2;
}

calcApp.init = function(){
  // variables
  calcApp.btns = document.getElementsByTagName('button');
  calcApp.display = document.getElementById('numShown');
  calcApp.curNum = 'r';
  calcApp.nums = [];
  calcApp.operators = [];
  calcApp.dpOperators = [];
  calcApp.curOp = '';
  calcApp.clearBtn = document.querySelector('[data-action=clear]');
  
  // call functions
  calcApp.btnFunc();
  console.log(calcApp.add(3,3), calcApp.subtract(3,3), calcApp.multiply(3,3), calcApp.divide(3,3));


  calcApp.dpArray = calcApp.nums.map((value) => {
    return value;
  });
}

calcApp.init();