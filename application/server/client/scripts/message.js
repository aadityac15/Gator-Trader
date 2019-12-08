const MESSAGES_URL = '/send_message?user_id=';
let titleTag, listing_ID, timeStamp, subject;
const msgData = new FormData();

const getItem_list = () => {
	titleTag = document.getElementById('titleTag').value;
	listing_ID = document.getElementById('listing_id').value;
	subject = document.getElementById('subject').value;
};

const sendMessages = async() => {
    console.log("SEND MESSAGES FOR USER");
    getItem_list();
	msgData.append("title", titleTag);
	msgData.append("created_by", sessionStorage.getItem(listing_id));
    let messages = await fetch(MESSAGES_URL + sessionStorage.getItem() +
    sessionStorage.setItem('message_body','message_body'), {
        method: "POST",
        body: msgData,
        withCredentials: true
    }).then(response => {
        if (response.user === undefined);
            alert("Please Login to continue.")
            response.redirect('/login')
        else {
            return response.text();
        }
    }).then(data => {

        try {
            let messagesObject = JSON.parse(data);
            let dummyData = messagesObject["listing"];
            let messages = messagesObject['message_id'];

            if (messages.length == 0) {
                // TODO: Create table row that says "No messages at the moment."
            }

            messages = messages.map((listing) => createMessagesTableRow(listing));

            return messages;
        } catch (e) {
            // TODO: Create table row with "No messages at the moment"
            console.log(e);
        }

        return messages;
    });

    const messageTableBody = document.getElementById("message-table")
        .getElementsByTagName('tbody')[0];

    messages.forEach(message => messageTableBody.append(message));
}


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


/*function receivedMsg() {
    var dataToShow = window.localStorage.getItem("subject");
    if (dataToShow != null) {
        document.getElementById("msg").innerHTML = dataToShow;
    } else {
        alert("no data to show ")
    }
}

function dataSave() {

    if (sessionStorage.getItem('userName') != null){
        if (typeof(Storage) !== "undefined") {
        var input = document.getElementById("subject"),
        fileName = input.value;
           if (fileName) {
            window.localStorage.setItem("subject", fileName);
            alert("Message successfully sent.")
            }else {
                alert("You must type a message in order to send.")
            }
        }else {
            alert("browsers not supported")
        }
     }
     else{
      //show validation message
     alert("Please Login");
    // window.open(`users/login`, "_blank");
     }
}

//window.onload = receivedMsg();
window.onload = function(dataSave){
    sessionStorage.setItem('userName', userName);
}

*/
