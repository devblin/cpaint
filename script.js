var penColor = "black";
var toolName = "pen";
var toW = document.getElementById("tow");
var canvas = document.getElementById("canvas");
var ncanvas = document.getElementById("ncanvas");
canvas.width = 600;
canvas.height = 500;
var pX = 0;
var pY = 0;
var colors = document.querySelectorAll(".colors");
var tools = document.querySelectorAll(".tools");
var ctx = canvas.getContext("2d");

for (var i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", changeColor);
}
for (var i = 0; i < tools.length; i++) {
  tools[i].addEventListener("click", changeTool);
}

ncanvas.addEventListener("dblclick", function () {
  if (toolName == "clear") {
    clear();
  } else if (toolName == "fill") {
    fill(penColor);
  } else if (toolName == "clearall") {
    canvas.style.backgroundColor = "white";
    clear();
  }
});
var cX;
var cY;
var sX;
var sY;
var ssX;
var ssY;
var ele = null;
var sq = null;
ncanvas.addEventListener("mousedown", down);
function down(e) {
  ncanvas.addEventListener("mousemove", move);
  ncanvas.addEventListener("mouseup", up);
  cX = e.clientX - canvas.offsetLeft;
  cY = e.clientY - canvas.offsetTop;
  ssX = cX;
  ssY = cY;
  if (toolName == "square" || toolName == "ellipse" || toolName == "circle") {
    createShape();
  }
  function move(e) {
    pX = e.clientX - canvas.offsetLeft;
    pY = e.clientY - canvas.offsetTop;
    sX = pX;
    sY = pY;
    console.log(e.clientX + " " + e.clientY);
    if (toolName == "pen") {
      draw(pX, pY, penColor, 2, 2);
    } else if (toolName == "eraser") {
      erase(pX, pY);
    } else if (
      toolName == "square" ||
      toolName == "circle" ||
      toolName == "ellipse"
    ) {
      drawShape();
    }
    cX = e.clientX - canvas.offsetLeft;
    cY = e.clientY - canvas.offsetTop;
  }
  function up() {
    ele = null;
    sq = null;
    ncanvas.style.cursor = "default";
    ncanvas.removeEventListener("mousemove", move);
    ncanvas.removeEventListener("mouseup", up);
  }
}
function fill(color) {
  canvas.style.backgroundColor = color;
}
function draw(sX, sY, color) {
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.moveTo(cX, cY);
  ctx.lineTo(sX, sY);
  ctx.strokeStyle = color;
  ctx.stroke();
}
function erase(sX, sY) {
  ctx.clearRect(sX, sY, 10, 10);
}
function clear() {
  ctx.clearRect(0, 0, 600, 500);
  ncanvas.innerHTML = "";
}
function changeColor(e) {
  penColor = e.target.getAttribute("data-color");
  toW.style.color = penColor;
  e.target.style.fontColor = "green";
}
function changeTool(e) {
  toolName = e.target.getAttribute("id");
  for (var i = 0; i < tools.length; i++) {
    var typ = tools[i];
    if (typ.getAttribute("id") == toolName) {
      e.target.style.color = "greenyellow";
    } else {
      typ.style.color = "white";
    }
  }
}
function createShape() {
  if (ele === null) {
    ele = document.createElement("div");
    ele.style.borderColor = penColor;
    if (toolName == "square") {
      ele.className = "rectangle";
    } else if (toolName == "ellipse" || toolName == "circle") {
      ele.className = "ellipse";
    }
    ele.style.left = ssX + "px";
    ele.style.top = ssY + "px";
    ncanvas.appendChild(ele);
  }
}
function drawShape() {
  if (ele !== null) {
    if (toolName == "square" || toolName == "ellipse") {
      ele.style.width = Math.abs(sX - ssX) + "px";
      ele.style.height = Math.abs(sY - ssY) + "px";
    } else {
      ele.style.width = Math.abs(sX - ssX) + "px";
      ele.style.height = Math.abs(sX - ssX) + "px";
    }
    ele.style.left = sX - ssX < 0 ? sX + "px" : ssX + "px";
    ele.style.top = sY - ssY < 0 ? sY + "px" : ssY + "px";
  }
}
