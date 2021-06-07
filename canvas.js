const canvasEl = document.getElementById('canvas-el');
const activeEl = document.getElementById('active');
const currStrokeColor = document.getElementById('currStrokeColor');
const clearEl = document.getElementById('clearEl');
const strokeStyles = document.getElementById('stroke-styles');

const strokeStylesValues = strokeStyles.children;

for( let i = 0; i<strokeStylesValues.length; i++) {
    strokeStylesValues[i].addEventListener('click', event => {
        event.preventDefault();
        context.lineWidth = 1;
        context.strokeStyle = event.target.className.split(" ")[1];
        currStrokeColor.className= 'canvas-stroke ' + event.target.className.split(" ")[1];
        console.log(currStrokeColor.className);
    })
}

clearEl.addEventListener('click', event => {
    event.preventDefault();
    context.lineWidth = 8;
    context.strokeStyle = 'aliceblue';
})

const context = canvasEl.getContext('2d');

context.strokeRect (0, 0, 300, 150);

const w = canvasEl.width;
const h=canvasEl.height;

const mouse = { x:0, y:0};
let draw = false;

canvasEl.addEventListener("mousedown", function(e){

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw = true;
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
});
canvasEl.addEventListener("mousemove", function(e){

    if(draw){

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
    }
});
canvasEl.addEventListener("mouseup", function(e){
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();
    draw = false;
});