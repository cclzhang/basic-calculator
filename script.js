

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
    console.log(btnClicked);
    

  } else if (this.className === 'mathSymbol') {
    calcApp.operators.push(btnClicked);
    calcApp.nums.push(parseFloat(calcApp.curNum));
    console.log(calcApp.nums);
    calcApp.display.textContent += " " + this.textContent + " ";
    
    calcApp.curNum = "";
    // if (this.dataset.action === 'plus') {
      //   console.log(...nums);
      // }
      
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
  
  // functions
  calcApp.btnFunc();
}

calcApp.init();