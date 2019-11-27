/*
 * @Author: aadityac15
 * @Date:   2019-11-24 02:07:44
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-24 02:28:36
 * @Description : File to populate the categories from a single csv file to maintain uniformity.
 */

const loadCategories = () => {
	console.log("The category array in landingPage.js"  + categoryArray)
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
