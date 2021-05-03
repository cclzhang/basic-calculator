

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
    calcApp.curNum = '';
    calcApp.nums = [];
    calcApp.display.textContent = calcApp.curNum;
  } else if (this.className === 'mathSymbol') {
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
    if (calcApp.display.textContent !== '0' || this.dataset.action) {
      // change curNum to 'curNum' + '<button> content'
      calcApp.curNum += btnClicked;
      calcApp.display.textContent += btnClicked;
    } else {
      // change curNum to <button> content
      calcApp.curNum = btnClicked;
      calcApp.display.textContent = btnClicked;
    }
  }
}

calcApp.btnFunc = function(){
  for (btn of calcApp.btns) {
    btn.addEventListener('click', calcApp.clickHandler);
  }
}

calcApp.init = function(){
  calcApp.btns = document.getElementsByTagName('button');
  console.log(calcApp.btns);
  calcApp.display = document.getElementById('numShown');
  calcApp.curNum = document.getElementById('numShown').textContent
  calcApp.btnFunc();
  calcApp.nums = [];
  
}

calcApp.init();