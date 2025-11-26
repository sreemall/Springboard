const users = [
	{firstName: "Alice", lastName: "Johnson", points: 120},
	{firstName: "Bob", lastName: "Smith", points: 99},
	{firstName: "Charlie", lastName: "Brown", points: 180}
];

console.log (users.map ((user) => {
			return (`${user.firstName}${user.lastName} ${user.points > 100 ? 'Premium' : 'Standard'}`);
}));