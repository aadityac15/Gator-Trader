const message_url = '/send_message';

const sendMessages = async () => {
    let sent_by = document.querySelector('#sent_by').value;
    let sent_to = document.querySelector('#sent_to').value;
    let message_body = document.querySelector('#message_body').value;
    let from_admin = document.querySelector('#from_admin').value;
    let listing_id = document.querySelector('#listing_id').value;

    let msgInfo = await createMsg(sent_by, sent_to, message_body, from_admin, listing_id);
    sessionStorage.setItem("message_id", msgInfo.message_id);
    sessionStorage.setItem("timestamp", msgInfo.timestamp);

    // after signup, automatically login
    sessionStorage.setItem('sent_by', sent_by);
   // sessionStorage.getItem('userName', userName);

    if (sessionStorage.getItem('username') != null){
        if (typeof(Storage) !== "undefined") {
            let message_body = document.querySelector('#message_body').value;
            if (message_body) {
            localStorage.setItem('message_body', message_body);
            localStorage.setItem('sent_by', sent_by) = sessionStorage.getElementById("created_by");
            localStorage.setItem('sent_to', sent_to);
            localStorage.setItem('from_admin', from_admin);
            localStorage.setItem('listing_id', listing_id);
            alert("Message successfully sent.")
            }else {
                alert("You must type a message in order to send.")
            }
          }
         else {
            alert("browsers not supported")
            }
     }
     else{
      //show validation message
     alert("Please Login");
    // window.open(`users/login`, "_blank");
     }
   };

let createMsg = (sent_by, sent_to, message_body, from_admin, listing_id) => {
    let new_message = {
        sent_by,
        sent_to,
        message_body,
        from_admin,
        listing_id
    };

    return fetch(message_url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        body: JSON.stringify(new_message)
    })
        .then(response => {
			return response.text();
		})
		.then(data => {
			let dataJson = JSON.parse(data);
			let listing = dataJson["listing"];
			let message = dataJson["messages"];
			let user = dataJson["users"];

            sent_to.textContent =  listing["created_by"];
            sent_by.textContent = user["user_id"];
            message_body.textContent = message["message_body"];
			});
		};


















/*const MESSAGES_URL = '/send_message?user_id=';

const test = new FormData();

const postMessages = () => {
    let listing_ID = document.getElementById('listing_id').value;
	let messageContent = document.getElementById('message_body').value;
	let admin = document.getElementById('from_admin').value;
	let sent_by = document.getElementById('sent_by').value;
	let sent_to = document.getElementById('sent_to').value;

};

//messageContent.addEventListener("submit",() => getMessage());

const sendMessages = () => {
    postMessages();
    console.log("SEND MESSAGES FOR USER");
	test.append("listing_id", listing_ID);
	test.append("message_body", messageContent);
	//test.append("from_admin", admin);
	//test.append("sent_by", sent_by);
	//test.append("sent_to", sent_to);
	sessionStorage.setItem("message_body", messageContent);

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
            sessionStorage.getItem('user_id') == sent_by;
            sessionStorage.getItem('created_by') == sent_to;
            sessionStorage.getItem('listing_id') == listing_ID;

            alert("Message Successfully Sent");
        }

	})
};
*/

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
