/*
 * @Author: aadityac15/ theseanathan
 * @Date:   2019-12-05 21:21:43
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-08 17:08:15
 * @Description: S
 */
const formData = new FormData();
const uploadTag = document.getElementById("image_upload");
let uploadedPicture = undefined;
let itemName, itemPrice, itemDescription, itemCategory;

const populateFormWithListing = () => {
	itemName = document.getElementById('itemName').value;
	itemPrice = document.getElementById('itemPrice').value;
	itemDescription = document.getElementById('itemDescription').value;
	itemCategory = document.getElementById('itemCategory').value;
	uploadedPicture = uploadTag.files[0];
};

const uploadImage = () => {
    populateFormWithListing();
    console.log(uploadedPicture);
    formData.append("file", uploadedPicture, "filename");
	formData.append("title", itemName);
	formData.append("price", itemPrice);
	formData.append("description", itemDescription);
	formData.append("type", itemCategory);
	formData.append("created_by", sessionStorage.getItem("user_id"));

	fetch("/create_listing", {
		method : "POST",
		body : formData,
	    credentials: 'same-origin',
	}).then(res => {
		console.log(res);
		location.replace('../listings/createSell_item_success')
	})
};
