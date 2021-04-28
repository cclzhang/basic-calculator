

const calcApp = {};

calcApp.clickHandler = function(){

  let btnClicked = this.textContent;
  let action = this.dataset.action;
  const nums = [];

  // if button is not a # or decimal
  if (action && action !== 'decimal') {
    const dataAction = this.dataset.action;
    console.log(dataAction);
    if (action === 'clear') {
      calcApp.dpNum = '0';
      calcApp.display.textContent = calcApp.dpNum;
    }
    
    if (this.className === 'mathSymbol') {
      const num = parseInt(calcApp.dpNum)
      nums.push(num);
      console.log(nums);
      // calcApp.display.textContent = calcApp.dpNum + " " + this.textContent + " ";
    }
  } else {

    // newly inputted numbers are always shown
    if (calcApp.display.scrollWidth > calcApp.display.clientWidth) {
      calcApp.display.scrollLeft = calcApp.display.scrollWidth;
    }
    
    // display cap is 30
    if (calcApp.dpNum.length >= 30) {
      calcApp.display.textContent = calcApp.dpNum;
    // if string currently displayed is not '0' OR the decimal btn is clicked
    // } else if (nums) {
    //   console.log('test');
    } else if (calcApp.dpNum !== '0' || this.dataset.action) {
      // change dpNum to 'dpNum' + '<button> content'
      calcApp.dpNum = calcApp.dpNum + btnClicked;
      calcApp.display.textContent = calcApp.dpNum;
    } else {
      // change dpNum to <button> content
      calcApp.dpNum = btnClicked;
      calcApp.display.textContent = calcApp.dpNum;
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
  calcApp.dpNum = document.getElementById('numShown').textContent
  calcApp.btnFunc();

}

calcApp.init();