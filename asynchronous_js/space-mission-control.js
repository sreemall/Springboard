// Task 1: Declare The Task Array and The Interval ID
// TODO: Begin by declaring an array to hold your one-time tasks (`oneTimeTasks`) and variables for any interval IDs you'll need for continuous tasks (`monitoringTaskId`).
let oneTimeTasks = [];
let monitoringTaskId = null;


// Task 2: Add One-Time Task Function
function addOneTimeTask (func, delay)
{
	// TODO: Write a function named `addOneTimeTask` that accepts a function (`func`) and a delay (`delay`) 
	// as parameters. This function should add an object containing both parameters into the `oneTimeTasks` array.
	oneTimeTasks.push ({function: func, delay: delay});
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks ()
{
	// TODO: Create a function named `runOneTimeTasks` that iterates over the `oneTimeTasks` array and uses 
	//`setTimeout` to schedule each task according to its delay.
	for (let i=0; i<oneTimeTasks.length; i++){
		setTimeout (oneTimeTasks[i].function, oneTimeTasks[i].delay);
	}
}

// Task 4: Start Monitoring Function
function startMonitoring ()
{
	// TODO: Write a function named `startMonitoring` that uses `setInterval` to simulate continuous monitoring.
	// This function should print a message every few seconds and store the interval ID in `monitoringTaskId`.
	monitoringTaskId = setInterval (() => {console.log("Monitoring tasks")}, 2000);

}

// Task 5: Stop Monitoring Function
function stopMonitoring ()
{
	// TODO: Implement a function named `stopMonitoring` that stops the continuous monitoring by using 
	// `clearInterval` on `monitoringTaskId`.
	clearInterval (monitoringTaskId);
	console.log ("Monitoring tasks Stopped");
}

// Task 6: Start Countdown Function
function startCountdown (duration)
{
	// TODO: Create a function named `startCountdown` that takes a duration parameter. 
	//Use `setInterval` to decrease the countdown every second and print the remaining time. 
	//Use `clearInterval` to stop the countdown when it reaches zero, printing a "Liftoff!" message.
	console.log ("Countdow started: ", duration, " Seconds");
	let countdownIntervalId = setInterval (() => {
										duration--;
										console.log ("Remaining Time = ", duration, " Seconds");
										if (duration <= 0) {
											clearInterval (countdownIntervalId);
											console.log ("Liftoff!");
										}
								}, 1000);
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission ()
{
	// TODO: Use the functions you've created to schedule the pre-launch system check, start and stop 
	// monitoring, and execute the countdown. Make sure to adjust the delays appropriately to simulate a 
	// real mission timeline.
	startMonitoring ();
	addOneTimeTask ( () => {console.log ("Pre launch system check completed");}, 5000);
	addOneTimeTask ( stopMonitoring, 10000);
	addOneTimeTask ( () => {startCountdown (10)}, 15000);

	runOneTimeTasks ();
}

scheduleMission(); // Starts the mission.
