

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
  

  // if the button clicked is clear
  if (action === 'clear') {
    calcApp.curNum = "r";
    calcApp.nums = [];
    calcApp.operators = [];
    calcApp.display.textContent = '0';

  } else if (action === 'calculate') {
    console.log(btnClicked);
    const result = calcApp.calculate();
    calcApp.display.textContent = result;
    calcApp.nums = [result];
    calcApp.curNum = 'r';

  } else if (action === 'percent') {
    console.log(btnClicked);

  } else if (action === 'plusMinus') {
    // console.log(calcApp.operators);
    
    if (calcApp.curNum[0] === '-') {
      calcApp.curNum = calcApp.curNum.substring(1);
      calcApp.curOp = '-';
      changeDpOperator();
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

    function reprintOperator(){
      console.log(`real: ${calcApp.operators} | display: ${calcApp.dpOperators}`);
      // calcApp.display.textContent = ;
      // calcApp.dpOperators.map()
    }



    console.log(parseFloat(calcApp.curNum));


  } else if (this.className === 'mathSymbol') {
    calcApp.operators.push(btnClicked);
    calcApp.dpOperators.push(btnClicked);
    calcApp.nums.push(parseFloat(calcApp.curNum));

    console.log(calcApp.nums, calcApp.operators);

    calcApp.display.textContent += " " + this.textContent + " ";
    
    calcApp.curNum = "";
      
  // if button is not a # or  decimal
  } else if (!action || action === 'decimal') {
    
    // if string currently displayed is not '0' OR the decimal btn is clicked
    if (calcApp.curNum === 'r' && !action) {
      // change curNum to <button> content
      calcApp.curNum = btnClicked;
      calcApp.display.textContent = btnClicked;
      console.log('hi')
    } else {
      // change curNum to 'curNum' + '<button> content'
      calcApp.curNum += btnClicked;
      calcApp.display.textContent += btnClicked;
    }
  }
}

calcApp.btnFunc = function(){
  for (btn of calcApp.btns) {
    btn.addEventListener('click', calcApp.clickHandler);
  }
}

calcApp.calculate = function(){
  return 2;
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
  
  // functions
  calcApp.btnFunc();



  calcApp.dpArray = calcApp.nums.map((value) => {
    return value;
  });
}

calcApp.init();