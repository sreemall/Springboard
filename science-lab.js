/* Task 1: Compile Participant Details with Shorthand Property Names */
// TODO: Construct an object named `participant` with properties for `name`, `age`, and `studyField`. Utilize 
// shorthand property names to simplify your code.
const name = "john";
const age = "20";
const studyField = "science";
const participant =  {name, age, studyField};

/* Task 2: Implement a Shorthand Function for Participant Info */
// TODO: Copy the `participant` object by adding a shorthand method named `displayInfo` that prints the 
// participant's details using `this` and a template string
// const participantInfo = {
//     participant,
//     displayInfo () {
//         console.log (`name: ${this.participant.name}
//                         age: ${this.participant.age}
//                         studyField: ${this.participant.studyField}`);
//     }
// }

/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
// TODO: Echo the above task with an arrow function. Observe the behavior of `this` and explain your findings.
/*
 * Observations: regular function (displayInfo) prints participant Info correctly where as arrow function
 * (displayInfoArrowFn) displays data undefined.
 * TODO: Explain here.
 * Answer:  regular function takes scope of the object it is called on, where as arrow function takes scope of
 * surrounding at the time of its definiton.  Here display arrow function scope at when it is defined is global
 * scope which doesn't have participant info details, hence undefined.
 */

const participantInfo = {
    ...participant,
    displayInfo () {
        console.log (`name: ${this.name} age: ${this.age} studyField: ${this.studyField}`);
    },
    displayInfoArrowFn: () => console.log (`name: ${this.name} age: ${this.age} studyField: ${this.studyField}`)
};
participantInfo.displayInfo ();
participantInfo.displayInfoArrowFn ();

/* Task 4: Using Computed Property Names */
// TODO: Implement a function named `updateParticipantInfo` that takes a property name and value as arguments 
// alongside an object and returns a new object with that property dynamically set.
function updateParticipantInfo(participantObj, propName, propValue) {
    return {...participantObj, [propName]:propValue };
}
console.log (updateParticipantInfo (participantInfo, 'name', 'mary'));