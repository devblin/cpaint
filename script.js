var penColor = "black";
var fillColor = "white";
var toolName = "pen";
var canvas = document.getElementById("canvas");
var colors = document.querySelectorAll(".colors");
var tools = document.querySelectorAll(".tools");
var ctx = canvas.getContext("2d");
for (var i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", changeColor);
}
for (var i = 0; i < tools.length; i++) {
  tools[i].addEventListener("click", changeTool);
}
function changeColor(e) {
  penColor = e.target.getAttribute("data-color");
  fillColor = e.target.getAttribute("data-color");
}
function changeTool(e) {
  toolName = e.target.getAttribute("id");
}
canvas.addEventListener("dblclick", function () {
  fill(fillColor);
});
var pX;
var pY;
canvas.addEventListener("mousedown", down);
function down(e) {
  if (toolName == "clear") {
    clear();
  }
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", up);
  pX = e.clientX - canvas.offsetLeft;
  pY = e.clientY - canvas.offsetTop;
  console.log(e.clientX + " " + e.clientY);
  console.log(canvas.offsetLeft + " " + canvas.offsetTop);
  function move(e) {
    pX = e.clientX - canvas.offsetLeft;
    pY = e.clientY - canvas.offsetTop;
    if (toolName == "pen") {
      draw(pX, pY, penColor, 1, 1);
    } else {
      draw(pX, pY, "white", 5, 5);
    }
  }
  function up() {
    canvas.removeEventListener("mousemove", move);
    canvas.removeEventListener("mouseup", up);
  }
}
function fill(color) {
  canvas.style.backgroundColor = color;
}
function draw(sX, sY, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(sX, sY, x, y);
}
function clear() {
  ctx.clearRect(0, 0, 600, 500);
}
