const cols = 120;
const rows = 75;
const framerate = 8;


const gap = 0.5;
let isPaused = true;  
let curState = [];  
const size = Math.min(Math.floor(1200 / cols), Math.floor(700 / rows));
let canvas;
let drawInterval;

const aliveColor = '#FFFFFF'
const deadColor = '#000000'

function setup() {
    smooth();
    frameRate(framerate);

    canvas = createCanvas(cols * size, rows * size);
    canvas.parent('canvas');

    for (let r = 0; r < rows; r++) {
        let row = []; 
        for (let c = 0; c < cols; c++) {
            row.push(0);
        }
        curState.push(row);
    }
    draw();
    noLoop();
}

function draw() {
    background(64);

    drawGrid();
    if (!isPaused) {  
        updateBoard();   
    }
}

function drawGrid() {
    noStroke();
    beginShape(QUADS);

    for (let r = 0; r < curState.length; r++) {
        for (let c = 0; c < curState[r].length; c++) {
            const x = c * size - gap;
            const y = r * size - gap;
            const isAlive = curState[r][c];

            var fillColor = isAlive ? aliveColor : deadColor;
            fill(fillColor);

            vertex(x, y);
            vertex(x + size - (gap * 2), y);
            vertex(x + size - (gap * 2), y + size - (gap * 2));
            vertex(x, y + size - (gap * 2));
        }
    }

    endShape();
}


function showRect(row, col, isAlive) {    
    const x = col * size - gap; 
    const y = row * size - gap; 
    
    if (isAlive) {
        fill(aliveColor);
        stroke(86, 78, 88);
        strokeWeight(1); 
        strokeCap(ROUND); 
    } else {
        noStroke();
        fill(deadColor);
    }
    
    rect(x, y, size - (gap * 2), size - (gap * 2));
}

function updateBoard() {   
    const rows = curState.length;
    const cols = curState[0].length;
    const newState = Array.from({ length: rows }, () => Array(cols).fill(0));  

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const liveNeib = countLiveNeighbours(r, c); 
            if (curState[r][c] === 1) {
                newState[r][c] = (liveNeib === 2 || liveNeib === 3) ? 1 : 0;
            } else {
                newState[r][c] = (liveNeib === 3) ? 1 : 0;
            }
        }
    }
    curState = newState;  
}

function countLiveNeighbours(i, j) {   
    const rows = curState.length;
    const cols = curState[0].length;
    let count = 0;

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue; 
            const ni = i + x;
            const nj = j + y;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                count += curState[ni][nj];  
            }
        }
    }
    
    return count;
}

function toggle() {
    if (document.getElementById('controlsorclose').textContent === 'Close') {
        document.getElementById('controlspopup').style.display = 'none';
        document.getElementById('controlsorclose').textContent = 'Controls';
        document.getElementById('controlsorclose').parentElement.classList.remove('pressed');
    } 
    if (document.getElementById('infoorclose').textContent === 'Close') {
        document.getElementById('infopopup').style.display = 'none';
        document.getElementById('infoorclose').textContent = 'Info';
        document.getElementById('infoorclose').parentElement.classList.remove('pressed');
    }
    isPaused = !isPaused;  
    if (isPaused) {  
        noLoop();
        document.getElementById('startorstop').textContent = 'Start';
        document.getElementById('startorstop').parentElement.classList.remove('pressed');
    } else {
        loop();
        document.getElementById('startorstop').parentElement.classList.add('pressed');
        document.getElementById('startorstop').textContent = 'Stop';
    }    
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let clickedCol = Math.floor(mouseX / size);
        let clickedRow = Math.floor(mouseY / size);
        
        if (clickedCol >= 0 && clickedCol < cols && clickedRow >= 0 && clickedRow < rows) {
            curState[clickedRow][clickedCol] = 1 - curState[clickedRow][clickedCol];  
            showRect(clickedRow, clickedCol, curState[clickedRow][clickedCol]);
        }
    }
}

function info() {
    if (document.getElementById('controlsorclose').textContent === 'Close') {
        document.getElementById('controlspopup').style.display = 'none';
        document.getElementById('controlsorclose').textContent = 'Controls';
        document.getElementById('controlsorclose').parentElement.classList.remove('pressed');
    } 
    if (document.getElementById('infoorclose').textContent === 'Info') {
        document.getElementById('infoorclose').textContent = 'Close';
        document.getElementById('infopopup').style.display = 'block';
        document.getElementById('infoorclose').parentElement.classList.add('pressed');
        isPaused = true;  
        if (document.getElementById('startorstop').textContent == 'Stop') {
            document.getElementById('startorstop').textContent = 'Start';
            document.getElementById('startorstop').parentElement.classList.remove('pressed');
        }
    } else if (document.getElementById('infoorclose').textContent === 'Close') {
        document.getElementById('infopopup').style.display = 'none';
        document.getElementById('infoorclose').textContent = 'Info';
        document.getElementById('infoorclose').parentElement.classList.remove('pressed');
    }  
}

function controls() {
    if (document.getElementById('infoorclose').textContent === 'Close') {
        document.getElementById('infopopup').style.display = 'none';
        document.getElementById('infoorclose').textContent = 'Info';
        document.getElementById('infoorclose').parentElement.classList.remove('pressed');
    }
    if (document.getElementById('controlsorclose').textContent === 'Controls') {
        document.getElementById('controlsorclose').textContent = 'Close';
        document.getElementById('controlspopup').style.display = 'block';
        document.getElementById('controlsorclose').parentElement.classList.add('pressed');
        isPaused = true;  
        if (document.getElementById('startorstop').textContent == 'Stop') {
            document.getElementById('startorstop').textContent = 'Start';
            document.getElementById('startorstop').parentElement.classList.remove('pressed');
        }
    } else if (document.getElementById('controlsorclose').textContent === 'Close') {
        document.getElementById('controlspopup').style.display = 'none';
        document.getElementById('controlsorclose').textContent = 'Controls';
        document.getElementById('controlsorclose').parentElement.classList.remove('pressed');
    } 
}

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    if (event.key === "r") {
        randomize();
    }
    if (event.key === " ") {
        reset();
    }
    if (event.key === 's' && isPaused) {
        isPaused = false;
        setTimeout(updateBoard(), 200);
    }
    draw();
    noLoop();
});

window.addEventListener('keyup', (event) => {
    if (event.key === 's') {
        isPaused = true;
        clearInterval(drawInterval);
    }
});

function reset() {
    for (let r = 0; r < curState.length; r++) {  
        for (let c = 0; c < curState[r].length; c++) {  
            curState[r][c] = 0;  
        }
    }
}

function randomize() {
    for (let r = 0; r < curState.length; r++) {  
        for (let c = 0; c < curState[r].length; c++) {  
            curState[r][c] = Math.floor(Math.random() * 1.1);  
        }
    }
}
