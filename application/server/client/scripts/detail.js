/*
 * @Author: aadityac15
 * @Date:   2019-11-17 22:31:21
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-27 15:38:19
 * @Description: Individual Listing for each item. Can also contact the seller.
 */

const titleTag = document.getElementById("titleTag");
const descriptionTag = document.getElementById("description");
const category = document.getElementById("category");
const listingImage = document.getElementById("listingImage");
const priceTag = document.getElementById("priceTag");
const created_by = document.getElementById("created_by");
const listing_ID = document.getElementById("listing_id");

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
			let dummyData = dataJson["listing"];

			    created_by.textContent = dummyData["created_by"];
			    listing_ID.textContent = dummyData["listing_id"];
				titleTag.textContent = dummyData["title"];
				descriptionTag.textContent = dummyData["description"];
				category.textContent = dummyData["type"];
				listingImage.style["margin-right"] = "20px";
				if (dummyData["thumbnail"] !== null) {
					listingImage.src = dummyData["thumbnail"];
					}
					else {
						listingImage.src = "https://via.placeholder.com/300";
					}
				priceTag.textContent = '$' + dummyData["price"];
			});
		};

window.onload = fetchIndividualListing();



