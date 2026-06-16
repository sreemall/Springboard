// async function fetchCostcoData(q, startAt = 0) {
//   const start = startAt
//   const warehouseId = 140
//   const query = encodeURIComponent(q)
//   const url =
//     `https://costco-live-data.p.rapidapi.com/search?q=${query}&warehouse_id=${warehouseId}&start=${start}&category_id=1148&category_path=%2Fgrocery-household.html`
//     //`https://costco-live-data.p.rapidapi.com/search?q=${query}&warehouse_id=${warehouseId}&start=${start}`
//     const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "0239d99c60msh2a8b78bd0bac930p17357cjsn11348ad0d594",
//       "x-rapidapi-host": "costco-live-data.p.rapidapi.com",
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(JSON.stringify(result, null, 2));
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchCostcoData("cleaning supplies"); // cleaning%20supplies



async function fetchCostcoData () {
const url = 'https://costco-live-data.p.rapidapi.com/search?q=cleaning%20supplies&warehouse_id=122&start=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '0239d99c60msh2a8b78bd0bac930p17357cjsn11348ad0d594',
		'x-rapidapi-host': 'costco-live-data.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

fetchCostcoData ();

// const url = 'https://rapidapi.com';
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '0239d99c60msh2a8b78bd0bac930p17357cjsn11348ad0d594',
//     'X-RapidAPI-Host': 'real-time-costco-data.p.rapidapi.com'
//   }
// };

// async function getCostcoProducts() {
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error fetching Costco data:', error);
//   }
// }

// getCostcoProducts();
