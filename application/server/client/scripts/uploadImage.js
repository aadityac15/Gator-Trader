/*
 * @Author: aadityac15
 * @Date:   2019-12-05 21:21:43
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-12-06 11:28:47
 */
const formData = new FormData();
const uploadTag = document.getElementById("image_upload");
let uploadedPicture = undefined;
console.log("The upload tag is ", uploadTag);
uploadTag.addEventListener("change",() => getImage());

const getImage = () => {
	console.log("In upload Image");
	 uploadedPicture = uploadTag.files[0];

	console.log(uploadedPicture);
	// Dummy image endpoint
	
};

const uploadImage = () => {	
	console.log(uploadedPicture);
	formData.append("file", uploadedPicture, "filename") // Temporary set to strign filename. Change as required.
	fetch("/upload_image", {
		method : "POST",
		body : formData,
	    credentials: 'same-origin',

	}).then(res => {
		console.log(res);
	})
}