let slider = document.getElementById('pixels');
let sliderNum = document.getElementById('pixelsValue');
let mousePressed = false;
let clearButton = document.getElementById('clear');
let sketchBackColorButton = document.getElementById('sketchBackColor');

sketchBackColorButton.onchange = function(){
    const drawing = document.querySelector('.drawing');
    drawing.style.background = this.value;
}

clearButton.onclick = clear;

slider.oninput = function(){
    sliderNum.innerHTML = this.value;
};
slider.onmouseup = function(){
    recreateSketch(this.value);
};

//Creates a matrix with size X size, pixels for drawing.
function createSketch(size){
    const drawing = document.querySelector('.drawing');
    drawing.style.cssText = `grid-template-columns: repeat(${size}, calc(100%/${size}));`;
    drawing.onmousedown = ()=>mousePressed = true;
    drawing.onmouseup = ()=>mousePressed = false;
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            createPixel(drawing);
        }
    }
}

//Create a single pixel and assign it to the DOM drawing.
function createPixel(drawing){
    let pixel = document.createElement('div');
    pixel.style.cssText = "border: 1px solid black; background: transparent;"
    pixel.addEventListener('mousemove', changeColor);
    drawing.appendChild(pixel);
}

function recreateSketch(size){
    const drawing = document.querySelector('.drawing');
    drawing.innerHTML = '';
    createSketch(size);
}

function changeColor(){
    if(mousePressed){
        this.style.background = document.getElementById('pincel').value;
    }
}

function clear(){
    const pixel = document.querySelectorAll('.drawing > div');
    pixel.forEach((elem)=>{
        elem.style.background = 'transparent';
    });
}

createSketch(16);