

const myApp = {};

myApp.numBtn = $(".numPad button")

myApp.btn.on("click", function() {
  console.log(parseInt(this.textContent));
})