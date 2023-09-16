const DEFAULT_MODE = "color"; // Changed from "#color"
const DEFAULT_COLOR = "#111111";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const rangeSlider = document.getElementById('rangeSlider');
const board = document.getElementById('board');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadBoard();
rangeSlider.onmousemove = (e) => updateRangeValue(e.target.value);
rangeSlider.onchange = (e) => changeRange(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function changeRange(value) {
  updateRangeValue(value);
  setCurrentSize(value);
  reloadBoard();
}

function updateRangeValue(value) {
  // Select the element with id 'sizeValue' and update its innerHTML
  document.querySelector('#sizeValue').innerHTML = `${value} x ${value}`;
}

function reloadBoard() {
  clearBoard();
  setupBoard(currentSize);
}

function clearBoard() {
  board.innerHTML = '';
}

function setupBoard(size) {
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const boardElement = document.createElement('div');
    boardElement.classList.add('board-element');
    boardElement.addEventListener('mousedown', changeColor);
    boardElement.addEventListener('mouseover', changeColor);
    board.appendChild(boardElement);
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && mouseDown) { // Corrected the condition
    if (currentMode === 'rainbow') { // Corrected the variable name
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') { // Corrected the variable name
      e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') { // Corrected the variable name
      e.target.style.backgroundColor = '#fefefe';
    }
  }
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active');
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active');
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active');
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active');
  } else if (newMode === 'color') {
    colorBtn.classList.add('active');
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active');
  }
}

window.onload = () => {
  setupBoard(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
