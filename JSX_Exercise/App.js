function App ()
{
	const spacePhenomena = [
		{id: 1, name: "Asteroid Belt", emoji: "☄️"},
		{id: 2, name: "Galactic Nebula", emoji: "🌌"},
		{id: 3, name: "Black Hole", emoji: "🕳️"},
		{id: 4, name: "Supernova Explosion", emoji: "💥"},
		{id: 5, name: "Pulsar", emoji: "⚡"},
		{id: 6, name: "Quasar", emoji: "💫"},
		{id: 7, name: "Exoplanet", emoji: "🪐"},
		{id: 8, name: "Interstellar Cloud", emoji: "☁️"},
		{id: 9, name: "Gamma-Ray Burst", emoji: "🌠"},
		{id: 10, name: "Magnetic Field Reversal", emoji: "🧲"}
	];

	const observationStatuses = ["🔭 Visible", "🌫 Faint", "🚀 Prime for Study"];
	
	let list = spacePhenomena.map (sp => {
		let rand = Math.floor (Math.random () * observationStatuses.length);
		return sp.emoji+sp.name+observationStatuses[rand]+(rand===2 ? "💡 Gear up with your best equipment" : "")});
	console.log (list);

	return (
		<div>
			<ul>
				{list.map (sp => (<li>{sp}</li>))}
			</ul>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
