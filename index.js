const slider = document.getElementById('pixels');
const sliderNum = document.getElementById('pixelsValue');

const sketchBackColorButton = document.getElementById('sketchBackColor');

//Buttons in Options div.
const gridButton = document.getElementById('gridButton');
const shadeButton = document.getElementById('Shade');
const enlightButton = document.getElementById('Enlight');
const normalButton = document.getElementById('Normal');
const randomButton = document.getElementById('Random');
const eraserButton = document.getElementById('Eraser');
const clearButton = document.getElementById('clear');

//Var
let penState = 0; //Normal pen active in beginning.
let gridState = true; //Initialize with grid active.

//Pen states, for pixel function: changeColor()
//Buttons update penState, to use in changeColor()
//And penState is used for buttonState set the active button.
normalButton.onclick = ()=>{penState = 0; buttonClassState();}
shadeButton.onclick = ()=>{penState = 2; buttonClassState();}
enlightButton.onclick = ()=>{penState = 1; buttonClassState();}
randomButton.onclick = ()=>{penState = 3; buttonClassState();}
eraserButton.onclick = ()=>{penState = 4; buttonClassState();}

//Update the state of the grid button.
//Update gridState and call respective function.
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

//Change background color.
sketchBackColorButton.onchange = function(){
    const drawing = document.querySelector('.drawing');
    drawing.style.background = this.value;
}

//Add event on clearButton.
clearButton.onclick = clear;

//Update slider number show while drag.
//But just recreate the grid, when finish.
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
    drawing.setAttribute('draggable', 'false');
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
    pixel.style['background-color'] = 'transparent';
    pixel.setAttribute('draggable', 'false');
    pixel.addEventListener('mouseenter', changeColor);
    pixel.addEventListener('mousedown', changeColor);
    drawing.appendChild(pixel);
}

//Delete all divs in drawing sketch and create then with a new size.
function recreateSketch(size){
    const drawing = document.querySelector('.drawing');
    drawing.innerHTML = '';
    createSketch(size);
}


function changeColor(mouse){
    if(mouse.buttons>0){
        switch(penState){
            case 0:
                this.style['background-color'] = document.getElementById('pincel').value;
                break;
            case 1:
                if(this.style['background-color']==='transparent'){
                    this.style['background-color'] = sketchBackColorButton.value;
                }
                this.style['background-color'] = proxColor(this.style['background-color'], 1.1, 10);
                break;
            case 2:
                if(this.style['background-color']==='transparent'){
                    this.style['background-color'] = sketchBackColorButton.value;
                }
                this.style['background-color'] = proxColor(this.style['background-color'], 0.9, -10);
                break;
            case 3:
                this.style['background-color'] = randomColor();
                break;
            case 4:
                this.style['background-color'] = 'transparent';
                break;
        }
    }
}

//Receive a color, multiply it to shade or enlight, and receive an add parameter,
//because black can't be multiplied.
//Return the new color.
function proxColor(color, multiplier, add = 0){
    const rgbColor = color.slice(4,-1).split(', ');
    const newRgbColor = rgbColor.map((elem)=>{
        return Number(elem*multiplier)+add;
    });
    const colorString = 'rgb('+newRgbColor.join(', ')+')';
    return colorString;
}

//Generate a random color, and return it.
function randomColor(){
    let color = '#';
    const arrOptions = '0123456789ABCDEF';
    for(let i = 0; i<6; i++){
        color += arrOptions[Math.floor(Math.random()*16)];
    }
    return color;
}

//Edit the pixels, to enable or disable grid.
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

//Show the correct pressed button, by adding '.active' class to it.
function buttonClassState(){
    normalButton.classList.remove('active');
    shadeButton.classList.remove('active');
    enlightButton.classList.remove('active');
    randomButton.classList.remove('active');
    eraserButton.classList.remove('active');
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
        case 4:
            eraserButton.classList.add('active');
            break;
    }
}


//Clear all the pixels back to transparent.
function clear(){
    recreateSketch(slider.value);
}


//Initialize the page with correct parameters.
document.getElementById('sketchBackColor').value = '#FFFFFF';
slider.value = '16';
createSketch(16);
document.getElementById('pincel').value = '#000000'
