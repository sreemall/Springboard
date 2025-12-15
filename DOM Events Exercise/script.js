const colorFormEle = document.getElementById ("color-form");
const colorInputEle = document.querySelector ("#color-input");
const submitBtnEle = document.querySelector ("#submit");
const newBoxBtnEle = document.querySelector ("#new-box-button");
const boxContainerEle = document.querySelector ("#box-container");

let boxColor = "";
let counter = 0;

const addBoxButton = (event) => {
    
    if (!(event.key === 'N' || event.type === "click"))
        return;

    const newBoxEle = document.createElement ("BUTTON");
    
    ++counter;
    const id = `Button ${counter}`
    newBoxEle.innerText = id;
    newBoxEle.id = id;
    newBoxEle.classList.add ("box");
    newBoxEle.style.backgroundColor = boxColor;
    boxContainerEle.appendChild (newBoxEle);
}

const formSubmit = (event) => {
    event.preventDefault ();
    
    boxColor = colorInputEle.value;
    changeBoxBtnsColor ();
}

const changeBoxBtnsColor = () => {
    
    const boxButtons = document.querySelectorAll (".box");
    for (let i=0; i<boxButtons.length; i++) {
        boxButtons[i].style.backgroundColor = boxColor;
    }
}
const removeBoxButton = (event) => {
    if (event.target.tagName === "BUTTON") {
        document.getElementById (event.target.id).remove ();
    }
}

const boxButtonMouseover = (event) => {
    if (event.target.classList.contains ("box")) {
        //const boxButtonEle = document.getElementById (event.target.id);
        //boxButtonEle.innerText = `(${event.pageX}, ${event.pageY})`;
        event.target.innerText = `(${event.pageX}, ${event.pageY})`;
    }
}

const boxButtonMouseout = (event) => {
    if (event.target.classList.contains ("box")) {
        //document.getElementById (event.target.id).innerText = event.target.id;
        event.target.innerText = event.target.id;
    }
}

function init () {

console.log ("DOM content loaded", document.getElementById("color-input"));

    colorFormEle.addEventListener ("submit", formSubmit);
    newBoxBtnEle.addEventListener ("click", addBoxButton);
    newBoxBtnEle.addEventListener ("keyup", addBoxButton);
    boxContainerEle.addEventListener ("dblclick", removeBoxButton);
    boxContainerEle.addEventListener ("mouseover", boxButtonMouseover);
    boxContainerEle.addEventListener ("mouseout", boxButtonMouseout);
}

document.addEventListener( "DOMContentLoaded", init);