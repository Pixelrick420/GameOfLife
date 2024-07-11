const cols = 80;
const rows = 48;
const framerate = 40;



const gap = 0.3;
let ispaused = true;
var curstate = [];
const size = Math.min(Math.floor(1200 / cols), Math.floor(700 / rows));

function setup(){
    smooth();
    frameRate(framerate);

    canvas = createCanvas(cols*size, rows*size);
    canvas.parent('canvas');

    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            row.push(0);//Math.floor(Math.random() * 2));
        }
        curstate.push(row);
    }
}

function draw() {
    background(0);

    for (let r = 0; r < curstate.length; r++) {
        for (let c = 0; c < curstate[r].length; c++) {
            showrect(r, c, curstate[r][c]);
        }
    }
    if (!ispaused) {
        updateboard();
    }
}

function showrect(row, col, isalive) {
    const x = col * size - gap; 
    const y = row * size - gap; 
    
    if (isalive) {
        fill('#55CC55');
        stroke(86, 78, 88);
        strokeWeight(1); 
        strokeCap(ROUND); 
    } else {
        noStroke();
        fill('#DD5555');
    }
    
    rect(x, y, size - (gap * 2), size - (gap * 2), size / 6);
}

function updateboard() {
    const rows = curstate.length;
    const cols = curstate[0].length;
    const newstate = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const liveneib = countliveneighbours(r, c);
            if (curstate[r][c] === 1) {
                newstate[r][c] = (liveneib === 2 || liveneib === 3) ? 1 : 0;
            } else {
                newstate[r][c] = (liveneib === 3) ? 1 : 0;
            }
        }
    }
    curstate = newstate;
}

function countliveneighbours(i, j) {
    const rows = curstate.length;
    const cols = curstate[0].length;
    let count = 0;

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue; 
            const ni = i + x;
            const nj = j + y;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                count += curstate[ni][nj];
            }
        }
    }
    
    return count;
}


function toggle(){
    if(document.getElementById('controlsorclose').textContent === 'Close'){
        document.getElementById('controlspopup').style.display = 'none';
        document.getElementById('controlsorclose').textContent = 'Controls';
        document.getElementById('controlsorclose').parentElement.style.backgroundColor = '';
    } 
    if(document.getElementById('infoorclose').textContent === 'Close'){
        document.getElementById('infopopup').style.display = 'none';
        document.getElementById('infoorclose').textContent = 'Info';
        document.getElementById('infoorclose').parentElement.style.backgroundColor = '';
    }
    ispaused = !ispaused;
    if(ispaused){
        document.getElementById('startorstop').textContent = 'Start';
        document.getElementById('startorstop').parentElement.style.backgroundColor = '';
    }   
    else{
        document.getElementById('startorstop').parentElement.style.backgroundColor = '#FF6666';
        document.getElementById('startorstop').textContent = 'Stop';
    }    
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let clickedCol = Math.floor(mouseX / size);
        let clickedRow = Math.floor(mouseY / size);
        
        if (clickedCol >= 0 && clickedCol < cols && clickedRow >= 0 && clickedRow < rows) {
            curstate[clickedRow][clickedCol] = 1 - curstate[clickedRow][clickedCol];
        }
    }
}

function info(){
    if(document.getElementById('controlsorclose').textContent === 'Close'){
        document.getElementById('controlspopup').style.display = 'none';
        document.getElementById('controlsorclose').textContent = 'Controls';
        document.getElementById('controlsorclose').parentElement.style.backgroundColor = '';
    } 
    if(document.getElementById('infoorclose').textContent === 'Info'){
        document.getElementById('infoorclose').textContent = 'Close';
        document.getElementById('infopopup').style.display = 'block';
        document.getElementById('infoorclose').parentElement.style.backgroundColor = '#FF6666';
        ispaused = true;
        if(document.getElementById('startorstop').textContent == 'Stop'){
            document.getElementById('startorstop').textContent = 'Start';
            document.getElementById('startorstop').parentElement.style.backgroundColor = '';
        }
    }

    else if(document.getElementById('infoorclose').textContent === 'Close'){
        document.getElementById('infopopup').style.display = 'none';
        document.getElementById('infoorclose').textContent = 'Info';
        document.getElementById('infoorclose').parentElement.style.backgroundColor = '';
    }  
}

function controls(){
    if(document.getElementById('infoorclose').textContent === 'Close'){
        document.getElementById('infopopup').style.display = 'none';
        document.getElementById('infoorclose').textContent = 'Info';
        document.getElementById('infoorclose').parentElement.style.backgroundColor = '';
    }
    if(document.getElementById('controlsorclose').textContent === 'Controls'){
        document.getElementById('controlsorclose').textContent = 'Close';
        document.getElementById('controlspopup').style.display = 'block';
        document.getElementById('controlsorclose').parentElement.style.backgroundColor = '#FF6666';
        ispaused = true;
        if(document.getElementById('startorstop').textContent == 'Stop'){
            document.getElementById('startorstop').textContent = 'Start';
            document.getElementById('startorstop').parentElement.style.backgroundColor = '';
        }
    }

    else if(document.getElementById('controlsorclose').textContent === 'Close'){
        document.getElementById('controlspopup').style.display = 'none';
        document.getElementById('controlsorclose').textContent = 'Controls';
        document.getElementById('controlsorclose').parentElement.style.backgroundColor = '';
    } 
}