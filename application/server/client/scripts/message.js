const MESSAGES_URL = '/send_message';
const test = new FormData();
let sent_to, messageContent, listingID;
const postMessages = () => {
    listingID = document.getElementById('listing_id');
	messageContent = document.getElementById('messageContent').value;
	//let admin = document.getElementById('admin').value;
	//let sent_by = document.getElementById("user_id").innerHTML;
	//let sent_to = document.getElementById("created_by").innerHTML;
    //textFile = messageContent.files[0];
};

const sendMessages = () => {
    postMessages();
    test.append("listing_id", localStorage.getItem("id"));
	test.append("message_body", messageContent);
	test.append("sent_by", sessionStorage.getItem('user_id'));
	test.append("sent_to", localStorage.getItem("listing_author"));
	//test.append("from_admin", admin);
	fetch(MESSAGES_URL, {
		method : "POST",
		body : test,
	    credentials: 'same-origin',
	}).then(res => {
	 if (res.sessionStorage.getItem('user_id') === undefined){
          alert("Please Login")
          location.replace('/login');
          return;
     } else {
          alert("Message have successful sent")
          console.log(res);
          location.replace('/');
      }
	})
};
