/*
 * @Author: aadityac15
 * @Date:   2019-11-24 02:07:44
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-27 15:02:34
 * @Description : File to populate the categories from a single csv file to maintain uniformity.
 */

const loadCategories = () => {
	console.log("The category array in landingPage.js " + categoryArray);
	console.log("type " + typeof categoryArray);
	console.log(document.getElementById("Vehicles"));
	// document.getElementById("Vehicles").textContent = "Vehicles";
	// if (categoryArray.includes("Vehicles")) {
	// 		document.getElementById("Vehicles").textContent = "Vehicles";
	// 	}
	// // categoryArray.map(category => {

	// // 	if (document.getElementById(category)) {
	// // 		if (category === "Vehicles"){
	// // 			console.log(category);
	// // 			console.log(document.getElementById(category));
	// // 			document.getElementById(category).innerHTML = "Vehicles";
	// // 		}
	// // 		document.getElementById(category).textContent = category;
	// // 		// debugger;
	// // 		document.getElementById(category).addEventListener("click", () => {
	// // 			localStorage.setItem("category", category);
	// // 			window.location.pathname = "/results";
	// // 		});
	// 	}
	// });

	// fetch("/categories", {
	// 	method: "GET"
	// })
	// 	.then(response => {
	// 		return response.text();
	// 	})
	// 	.then(data => {
	// 		let jsonData = JSON.parse(data);
	// 		let categoryArray = jsonData["categories"];
	// 		categoryArray.map(category => {
	// 			if (document.getElementById(category)) {
	// 				document.getElementById(category).textContent = category;
	// 			}
	// 		});
	// 	});
};

window.onload = loadCategories();
