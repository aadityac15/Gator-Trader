const MESSAGES_URL = '/send_message?user_id=';

const test = new FormData();

let messageItems = undefined
const postMessages = () => {
    let listing_ID = document.getElementById('listing_id').value;
	let messageContent = document.getElementById('message_body').value;
	//let admin = document.getElementById('from_admin').value;
	//let sent_by = document.getElementById('sent_by').value;
	//let sent_to = document.getElementById('sent_to').value;
	localStorage.setItem("message_body", messageContent)
};

messageContent.addEventListener("submit",() => getMessage());

const sendMessages = () => {
    postMessages();
    console.log("SEND MESSAGES FOR USER");
	test.append("listing_id", listing_ID);
	test.append("message_body", messageContent);
	//formData.append("from_admin", admin);
	//formData.append("sent_by", sent_by);
	//formData.append("sent_to", sent_to);


	fetch(MESSAGES_URL + sessionStorage.getItem('user_id'), {
		method : "POST",
		body : formData,
	    credentials: 'same-origin',
	}).then(res => {
	    if (res.sessionStorage.getItem('user_id') === undefined){
	         alert("Please Login to Continue");
	         res.redirect('/login');
	    }
        else {
            return response.text();
            console.log(res);
            alert("Message Successfully Sent");
        }

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

//window.onload = receivedMsg();
window.onload = function(dataSave){
    sessionStorage.setItem('userName', userName);
}

*/
