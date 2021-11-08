const slider = document.getElementById('pixels');
const sliderNum = document.getElementById('pixelsValue');
const mouseDetected = document.querySelector('body');
let mousePressed = false;
const clearButton = document.getElementById('clear');
const sketchBackColorButton = document.getElementById('sketchBackColor');
const gridButton = document.getElementById('gridButton');
let gridState = true;


gridButton.onclick = function(){
    if(gridState){
        gridState = false;
    }else{
        gridState = true;
    }
    gridStateFunc();
}

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

//FUNCTIONS:

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

    gridStateFunc();
}

//Create a single pixel and assign it to the DOM drawing.
function createPixel(drawing){
    let pixel = document.createElement('div');
    pixel.style.cssText = "background: transparent;"
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

function gridStateFunc(){
    const pixel = document.querySelectorAll('.drawing > div');
    if(gridState){
        pixel.forEach((elem)=>{
        elem.style.border = '1px solid black';
    });
    }else{
        pixel.forEach((elem)=>{
        elem.style.border = '';
        });
    }  
}

function clear(){
    const pixel = document.querySelectorAll('.drawing > div');
    pixel.forEach((elem)=>{
        elem.style.background = 'transparent';
    });
}

createSketch(16);