

const myApp = {};

myApp.numBtn = $(".numPad button")
// myApp.

myApp.btn.on("click", function() {
  console.log(parseInt(this.textContent));
})