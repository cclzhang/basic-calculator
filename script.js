

const myApp = {};

myApp.btn = $("button")
myApp.display = $("#numShown");
myApp.dpNum = myApp.display[0].textContent;

myApp.btn.on("click", function() {
  let numChosen = this.textContent;
  let action = this.dataset.action;

  // if button is not a # or decimal
  if (action && action !== 'decimal') {
    const dataAction = this.dataset.action;
    console.log(dataAction);
    if (action === 'clear') {
      myApp.dpNum = '0';
      myApp.display.html(myApp.dpNum);
    }
  } else {
    // if string currently displayed is not '0' OR the decimal btn is clicked
    if (myApp.dpNum !== '0' || this.dataset.action) {
      // change dpNum to 'dpNum' + '<button> content'
      myApp.dpNum = myApp.dpNum + numChosen;
      myApp.display.html(myApp.dpNum);
    } else {
      // change dpNum to <button> content
      myApp.dpNum = numChosen;
      myApp.display.html(myApp.dpNum);
    }
    // console.log(parseInt(newDpNum));
  }

})

const calcApp = {};

calcApp.btnClick = function(){
  console.log(this.textContent);
}

calcApp.btnFunc = function(){
  for (btn of calcApp.btns) {
    btn.addEventListener('click', calcApp.btnClick);
  }
}

calcApp.init = function(){
  calcApp.btns = document.getElementsByTagName('button');
  console.log(calcApp.btns);
  calcApp.btnFunc();
}

calcApp.init();