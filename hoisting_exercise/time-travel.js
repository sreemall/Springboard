/* Task 1: Declare a Destination Variable */
// TODO: Use `let` to declare a variable named `destination` and assign it the value `"Ancient Egypt"`. Print the destination to the console.
    let destination = "Ancient Egypt";
    console.log ("destination = ", destination);
/* Task 2: Change the Destination */
// TODO: Now, change the `destination` variable to `"Medieval Europe"`. Print the new destination to the console.
destination = "Medieval Europe";
console.log ("new destination = ", destination);
/* Task 3: Declare a Constant Travel Date */
// TODO: Use `const` to declare a variable named `travelDate` and set it to `"2024-03-15"`. Try to change the `travelDate` to another value and observe and explain what happens as a comment.
/*
 * Observations:
 * TODO: Explain here.
 * Answer: It gives Type Error  since you cannot assign value to const outside declaration
 */
const travelDate = "2024-03-15";
//travelDate = "2025-01-15";

/* Task 4: Experiment with Variable Hoisting */
// TODO: Before declaring any variable, try to print a variable named `timeMachineModel` to the console. Then, declare `timeMachineModel` using `var` and assign it the value `"T-800"`. Observe and explain what happens as a comment.
/*
 * Observations:
 * TODO: Explain here.
 * Answer:  It prints 'undefined'.  var type variables are hoisted, it recognizes the declaration of the timeMachineMode,
 * but don't have any value assigned to it by console.log statement, hence undefined is printed. 
 */
console.log ("timeMachineMode : ", timeMachineModel);
var timeMachineModel = "T-800";