const mythicalCreatures = [
	{name: "Dragon", type: "Fire", lastSeen: "Volcano Valley"},
	{name: "Mermaid", type: "Water", lastSeen: "Coral Caves"},
	{name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest"},
	{name: "Griffin", type: "Air", lastSeen: "Highwind Mountains"},
	{name: "Kraken", type: "Water", lastSeen: "Abyssal Depths"}
];
//- Use the **`find`** method to locate the first creature of the "Water" type and log its name to the console.
//- Use the **`findIndex`** method to locate the index of the "Griffin" in the mythical creatures array and log it to the console.
//- Use the **`find`** method to locate the first creature last seen in "Enchanted Forest".

console.log ("Water type creature: ", mythicalCreatures.find ((creature) => {
	return (creature.type === 'Water');
}).name)

console.log ("Index of creature Griffin: ", mythicalCreatures.findIndex ((creature) => {
	return (creature.name === 'Griffin');
}))

console.log ("first creature last seen in Enchanted Forest: ", mythicalCreatures.find ((creature) => {
	return (creature.lastSeen === 'Enchanted Forest');
}).name);