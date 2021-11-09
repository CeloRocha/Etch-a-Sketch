const slider = document.getElementById('pixels');
const sliderNum = document.getElementById('pixelsValue');
const mouseDetected = document.querySelector('body');
let mousePressed = false;
const clearButton = document.getElementById('clear');
const sketchBackColorButton = document.getElementById('sketchBackColor');
const gridButton = document.getElementById('gridButton');
let gridState = true;
const shadeButton = document.getElementById('Shade');
const enlightButton = document.getElementById('Enlight');
const normalButton = document.getElementById('Normal');
const randomButton = document.getElementById('Random');
let penState = 0;

//Pen states, for pixel function: changeColor()
normalButton.onclick = ()=>{penState = 0; buttonClassState();}
shadeButton.onclick = ()=>{penState = 2; buttonClassState();}
enlightButton.onclick = ()=>{penState = 1; buttonClassState();}
randomButton.onclick = ()=>{penState = 3; buttonClassState();}

gridButton.onclick = function(){
    if(gridState){
        gridState = false;
        this.classList.remove('active');
    }else{
        gridState = true;
        this.classList.add('active');
    }
    gridStateFunc();
}

sketchBackColorButton.onchange = function(){
    const pixel = document.querySelectorAll('.drawing > div');
    pixel.forEach((elem)=>{
        elem.style['background-color'] = document.getElementById('sketchBackColor').value;
    });
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
    pixel.style['background-color'] = document.getElementById('sketchBackColor').value;
    pixel.addEventListener('mousemove', changeColor);
    drawing.appendChild(pixel);
}

function recreateSketch(size){
    const drawing = document.querySelector('.drawing');
    drawing.innerHTML = '';
    createSketch(size);
}

function changeColor(){
    let rgbColor;
    let newRgbColor;
    let colorString;
    if(mousePressed){
        switch(penState){
            case 0:
                this.style['background-color'] = document.getElementById('pincel').value;
                break;
            case 1:
                rgbColor = this.style['background-color'].slice(4,-1).split(', ');
                newRgbColor = rgbColor.map((elem)=>{
                    return Number(11*elem/10);
                });
                colorString = 'rgb('+newRgbColor.join(', ')+')';
                this.style['background-color'] = colorString;
                console.log('aaaa')
                break;
            case 2:
                rgbColor = this.style['background-color'].slice(4,-1).split(', ');
                newRgbColor = rgbColor.map((elem)=>{
                    return Number(9*elem/10);
                });
                colorString = 'rgb('+newRgbColor.join(', ')+')';
                this.style['background-color'] = colorString;
                break;
            case 3:
                this.style['background-color'] = randomColor();
                break;
        }
    }
}

function randomColor(){
    let color = '#';
    const arrOptions = '0123456789ABCDEF';
    for(let i = 0; i<6; i++){
        color += arrOptions[Math.floor(Math.random()*16)];
    }
    return color;
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

function buttonClassState(){
    normalButton.classList.remove('active');
    shadeButton.classList.remove('active');
    enlightButton.classList.remove('active');
    randomButton.classList.remove('active');
    switch(penState){
        case 0:
            normalButton.classList.add('active');
            break;
        case 1:
            enlightButton.classList.add('active');
            break;
        case 2:
            shadeButton.classList.add('active');
            break;
        case 3:
            randomButton.classList.add('active');
            break;
    }
}

function clear(){
    const pixel = document.querySelectorAll('.drawing > div');
    pixel.forEach((elem)=>{
        elem.style['background-color'] = document.getElementById('sketchBackColor').value;
    });
}

document.getElementById('sketchBackColor').value = '#FFFFFF';
slider.value = '16';
createSketch(16);
document.getElementById('pincel').value = '#000000'
