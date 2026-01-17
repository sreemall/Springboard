// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;

const startButtonElemet = document.getElementById ("start");
const spinnerElement  = document.getElementById ("spin-container");
const jeopardyTableElement = document.getElementById ("jeopardy");
const theadElement = document.querySelector ("thead");
const tbodyElement = document.querySelector ("tbody");
let tableCellData = [];

startButtonElemet.addEventListener ("click", setupAndStart);

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const res = await axios.get ("https://rithm-jeopardy.herokuapp.com/api/categories?count=100");
    //console.log ("res.data=", res.data);
    
    let categoryIds = res.data.map (category => category.id);
    //console.log ("categoryIds=", categoryIds);

    //select random NUM_CATGORIES 
    let catIds = _.sampleSize (categoryIds, NUM_CATEGORIES);
    //console.log ("after random sample categoryIds=", catIds);
    return catIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    //console.log ("in getCategory()");
    const res = await axios.get (`https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`);
    //console.log ("category info for catId=", catId, res.data);
    const clues_data = {title: res.data.title, clue_array: []};
    for (clue of res.data.clues) {
        clues_data.clue_array.push ({question: clue.question, answer: clue.answer, showing: null});
    }
    return clues_data;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {

    hideLoadingView ();

    let catIds = await getCategoryIds ();
    //console.log ("catIds=", catIds);

    let headHTML = "<tr> ";
    
    for (let i=0; i<catIds.length; i++) {
        //console.log (catIds[i]);
        // let category = await getCategory (catIds[i]);
        // console.log ("after category=", category.title);
        // headHTML += `<th> ${category.title} </th> `
        // tableCellData[i] = [];
        // for(let j=0; j<category.clues.length; j++) {
        //     tableCellData[i].push ({showingQuestion: false, question: category.clues[j].question, 
        //                                         answer: category.clues[j].answer});
        // }

        const clues_data = await getCategory (catIds[i]);
        headHTML += `<th> ${clues_data.title} </th> `;
        tableCellData[i] = [];
        for(let j=0; j<clues_data.clue_array.length; j++) {
            tableCellData[i].push (clues_data.clue_array[j]);
        }
    }
    headHTML += "</tr>";
    theadElement.innerHTML = headHTML;

    for (let col=0; col<NUM_QUESTIONS_PER_CAT; col++) {
        const trElement = document.createElement ("tr");

        for (let row=0; row<NUM_CATEGORIES; row++) {
            // bodyHTML += `<td>${tableCellData[row][col]}</td>`;
            const tdElement = document.createElement ("td");
            tdElement.id = row + "-" + col;
            //tdElement.textContent = "?";
            const icon = document.createElement ("i");
            icon.classList.add ("fas", "fa-question-circle", "fa-3x");
            tdElement.appendChild (icon);
            //tdElement.addEventListener ("click", handleClick);
            trElement.appendChild (tdElement);
        }
        tbodyElement.appendChild (trElement);
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    
    const [cat, questionNo] = evt.target.id.split ("-");
    //console.log ("In handleClick.... cat", cat, questionNo);
    //console.log (tableCellData[cat][questionNo])
    // if (!tableCellData[cat][questionNo].showingQuestion) {  //show question
    //     evt.target.textContent = tableCellData[cat][questionNo].question;
    //     tableCellData[cat][questionNo].showingQuestion = true;
    // }
    // else {  // show answer
    //     console.log ("else shown answer")
    //     console.log (tableCellData[cat][questionNo])
    //     evt.target.textContent = tableCellData[cat][questionNo].answer;
    //     evt.target.classList.add ("disabled");
    // }

    if (!tableCellData[cat][questionNo].showing) {  //show question
        evt.target.textContent = tableCellData[cat][questionNo].question;
        tableCellData[cat][questionNo].showing = "question";
    }
    else if (tableCellData[cat][questionNo].showing === "question") {  // show answer
        //console.log ("else shown answer")
        //console.log (tableCellData[cat][questionNo])

        tableCellData[cat][questionNo].showing = "answer";
        evt.target.textContent = tableCellData[cat][questionNo].answer;
        evt.target.classList.add ("disabled");
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    theadElement.innerHTML = "";
    tbodyElement.innerHTML = "";

    spinnerElement.style.display = "block";
    //spinnerElement.classList.remove ("hidden");
    startButtonElemet.textContent = "Loading...";
    startButtonElemet.classList.add ("disabled");
    
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    spinnerElement.style.display = "none";
    startButtonElemet.textContent = "Restart";
    startButtonElemet.classList.remove ("disabled");
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    //console.log ("setupAndStart ...");

/** On click of start / restart button, set up game. */
// TODO
    if (startButtonElemet.textContent !== "Loading...") {  //not currently loading table data
        showLoadingView ();
        await new Promise(r => setTimeout(r, 250));
        tableCellData = [];
        fillTable ();
    }
}
/** On page load, add event handler for clicking clues */
// TODO
jeopardyTableElement.addEventListener ("click", (event) => {
// if (event.target && event.target.tagName === "TD")
//     handleClick (event);
const td = event.target.closest("td");
if (!td)
    return;
else
    handleClick ({target: td});
});
