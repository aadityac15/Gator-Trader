/*
 * @Author: aadityac15
 * @Date:   2019-11-17 22:31:21
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-18 15:53:14
 * @Description: Individual Listing for each item. Can also contact the seller.
 */

const titleTag = document.getElementById("titleTag");
const descriptionTag = document.getElementById("description");
const sellerTag = document.getElementById("seller-info");
const listingImage = document.getElementById("listingImage");
const priceTag = document.getElementById("priceTag")
const fetchIndividualListing = async () => {
	let query = localStorage.getItem("id");
	const FETCH_URL = `/listing?listing_id=${query}`;
	
	await fetch(FETCH_URL, {
		method: "GET"
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			let dataJson = JSON.parse(data);
			console.log(dataJson);
			console.log("Type of data", typeof dataJson);
			let dummyData = dataJson["listing"];
			console.log("The dummy data", dummyData);
			
				titleTag.textContent = dummyData["title"];
				descriptionTag.textContent = dummyData["description"];
				sellerTag.textContent = "Sold by " + dummyData["created_by"];
				if (dummyData["thumbnail"] !== null) {
					listingImage.src = dummyData["thumbnail"];
					}
					else {
						listingImage.src = "https://via.placeholder.com/300";
					}
				priceTag.textContent= dummyData["price"] + '$';
			});

		};

window.onload = fetchIndividualListing();
