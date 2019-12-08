/*
 * @Author: aadityac15
 * @Date:   2019-12-05 21:21:43
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-12-06 11:28:47
 */
const formData = new FormData();
const uploadTag = document.getElementById("image_upload");
let uploadedPicture = undefined;
let itemName, itemPrice, itemDescription, itemCategory;

uploadTag.addEventListener("change",() => getImage());

const populateFormWithListing = () => {
	itemName = document.getElementById('itemName').value;
	itemPrice = document.getElementById('itemPrice').value;
	itemDescription = document.getElementById('itemDescription').value;
	itemCategory = document.getElementById('itemDescription').value;
	uploadedPicture = uploadTag.files[0];
};

const uploadImage = () => {
    // TODO: GET user_id as well
    populateFormWithListing();
    console.log(uploadedPicture);
    formData.append("file", uploadedPicture, "filename");
	formData.append("title", itemName);
	formData.append("price", itemPrice);
	formData.append("description", itemDescription);
	formData.append("category", itemCategory);

	fetch("/create_listing", {
		method : "POST",
		body : formData,
	    credentials: 'same-origin',
	}).then(res => {
	    console.log("INSIDE THEN");
		console.log(res);
	})
};
