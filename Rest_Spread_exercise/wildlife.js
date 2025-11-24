/* Task 1: Track Animal Sightings */
// TODO: Write a function with rest parameters to print sightings of different animals within the sanctuary. 
// This function should accept an arbitrary number of animal names.
function trackAnimalSightings (...animals) {
	console.log ("Animal Sightings: ", animals);
}
/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
// TODO: You are given two arrays of habitat names. Use the spread operator to combine them into a comprehensive 
// list of protected areas within the sanctuary.
const protectedAreas = [...forestHabitats, ...savannahHabitats];
console.log ("Protected Areas: ", protectedAreas);
/* Task 3: Update Conservation Status */
const rhinoStatus = {
	population: 500,
	status: "Endangered"
};
updatedRhinoStatus = {...rhinoStatus, status: "Vulnerable"};
console.log ("updated Rhino status: ", updatedRhinoStatus);
// TODO: You are given an object representing an animal's conservation status. Use the spread operator to update 
//this status with new information, such as an increase in population or a change in habitat.

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
	name: "Leo",
	age: 5,
	species: "Lion"
};
// TODO: Duplicate an animal profile object using a shallow copy. Add genetic diversity information using the 
// `genetics` property to this copy. Observe and explain how changes to nested properties affect both the original and the copied object.
/*
 * Observations:
 * TODO: Explain here.
 */
const lionGeneticsProfile = { ...lionProfile,
								genetics: 'Diverse'};
console.log ("lion Profile: ", lionProfile);
console.log ("lion Genetics Profile: ", lionGeneticsProfile);
/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
	waterQuality: "Good",
	foodSupply: {
		herbivores: "Abundant",
		carnivores: "Sufficient"
	}
};
// TODO: You are given an object with a nested structure detailing the ecosystem's health, including water 
// quality and food supply. Perform a shallow copy and modify a nested property. Observe and explain how 
// changes to nested properties affect both the original and the copied object.
/*
 * Observations: both ecosystemHealth and ecosystemHealth_updated contains the updataed value for carnivores property
 * TODO: Explain here.
 * This is because ecosystemHealth_updated is a shallow copy of ecosystemHealth, they both have a reference to the same object
 * of internal foodSupply object.  so any change done on this object in ecosystemHealth_updated reflects the same
 * in ecosystemHealth.
 * 
 */
//const ecosystemHealth_updated = {... ecosystemHealth, foodSupply: {...ecosystemHealth.foodSupply, carnivores: "Abundant"}};
const ecosystemHealth_updated = {... ecosystemHealth};
ecosystemHealth_updated.foodSupply.carnivores = 'Abundant';
console.log ("Eco System Health: ", ecosystemHealth);
console.log ("Updated Eco System Health: ", ecosystemHealth_updated);