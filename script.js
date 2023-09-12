const DEFAULT_MODE = "#color";
const DEFAULT_COLOR = "#111111";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR  
let currentMode = DEFAULT_MODE  
let currentSize = DEFAULT_SIZE  



const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const rangeSlider = document.getElementById('rangeSlider')
const board = document.getElementById('board')


colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadBoard();
rangeSlider.onmousemove = (e) => updateRangeValue(e.target.value);
rangeSlider.onchange = (e) => changeRange(e.target.value);


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

function changeRange(value) {
  updateRangeValue(value)
  setCurrentSize(value)
  reloadBoard()
}

function updateRangeValue() {
  sizeValue.innerHTMl = `${value} x ${value}`
}

function reloadBoard() {
  clearBoard()
  setupBoard(currentSize)
}

function clearBoard() {
  board.innerHTML = ''
}

function setupBoard(size) {
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const boardElement = document.createElement('div');
    boardElement.classList.add('board-element');
    boardElement.addEventListener('mousedown' ,changeColor);
    boardElement.addEventListener('mouseover' ,changeColor);
    board.appendChild(boardElement);
    
  }
}


window.onload = () => {
  setupBoard(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}

