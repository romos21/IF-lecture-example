const canvasEl = document.getElementById('canvas-el');
const strokeStyles = document.getElementById('stroke-styles');

const strokeStylesValues = strokeStyles.children;

for( let i = 0; i<strokeStylesValues.length; i++) {
    console.log(strokeStylesValues[i].);
}

const context = canvasEl.getContext('2d');

context.strokeRect (0, 0, 300, 150);
context.strokeStyle = 'red';

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