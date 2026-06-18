const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

//canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvas.offsetTop;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let drawing = false;

//setting brush (white collor and pixel style)
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 4;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

//start and end draw function
function startPosition(e) {
    drawing = true;
    draw(e);
}

function endPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    //touchscreen and mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    //Correct coordinate
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

//listeners with mouse
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

//listeners with mobile
canvas.addEventListener('touchstart', (e) => {startPosition(e); e.preventDefault(); });
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', (e) => {draw(e); e.preventDefault(); });
