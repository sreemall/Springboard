const tasks = () => {
    task1 ();
    task2 ();
    task3 ();
    task4 ();
    task5 ();
    task6 ();
    task7 ();
    task8 ();
    task9 ();
}

document.addEventListener ("DOMContentLoaded", tasks);

function task1 () {
    document.getElementById ('task1').innerText = "Changed using 'innerText'.";
}

function task2 () {
    document.getElementById ('task2').innerHTML = "<button> Submit </button>";
}

function task3 () {
    document.body.style.backgroundColor = "#232323";
}

function task4 () {
    const itemElements = document.getElementsByClassName ('item');
    for (let i=0; i<itemElements.length; i++) {
        itemElements[i].style.border = "2px solid black";
    }
}

function task5 () {
    document.getElementById ("task5").href = 'https://www.springboard.com/'
}

function task6 () {
    document.getElementById ("task6").value = "DOM Master";
}

function task7 () {
    document.getElementById ("task7").classList.add ('new-class');
}

function task8 () {
    const btn = document.createElement ("button");
    btn.innerText = "New Button";
    document.getElementById ("task8").appendChild (btn);
}

function task9 () {
    document.getElementById ("task9").remove ();
}