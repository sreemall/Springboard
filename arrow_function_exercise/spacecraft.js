/* Task 1: No Parameters: Activate Hyperdrive */
// TODO: Write an arrow function named `activateHyperdrive` with no parameters that print `"Hyperdrive activated!"` to the console. Call `activateHyperdrive` to test it.
const activateHyperdrive = () => console.log ("Hyperdrive activated!");
activateHyperdrive ();
/* Task 2: Implicit Return: Scan for Lifeforms */
// TODO: Create an arrow function named `scanForLife` that implicitly returns `"No lifeforms detected"` without using curly braces. Print the result of calling `scanForLife`.
const scanForLife = () => "No lifeforms detected";
console.log (scanForLife());
/* Task 3: Implicit Return with Objects: Log Coordinates */
// TODO: Write an arrow function named `currentCoordinates` that returns an object with properties `x`, `y`, and `z`, representing coordinates in space. Use implicit return. Print the returned object from `currentCoordinates`.
currentCoordinates = () => ( {x: 12, y: 25, z: 5});
console.log ("currentCoordinates = ", currentCoordinates());
/* Task 4: Understanding `this`: Message from Home Base */
// TODO: Inside an object named `spacecraft`, create a method named `receiveMessage` using arrow function syntax.
// This method should log `"Message received: "` followed by a message it receives as a parameter. Directly 
// call `receiveMessage` within `spacecraft` and observe. Observe and explain the behavior of `this` in this 
// context as a comment.
/*
 * Observations: call to arrow function prints udefined for this.name, where as call to regular function prints
        InSat 1 for this.name
 * TODO: Explain here.
        Answer: Arrow functions do not have their own this scope, they rather take surround/parental scope at the
        time they are defined.
        Regular function take this scope based on how they are called, here we are calling obj.method so they take
        obj as this inside the method.
 */
const spacecraft = {
    name: "InSat 1",
    receiveMessage:  (param) => console.log ("Message received by ", this.name, " : ", param),
    receiveMessageFn:  function (param) { console.log ("Message received by ", this.name, " : ", param); }
};
spacecraft.receiveMessage ("from earth");
spacecraft.receiveMessageFn ("from earth");