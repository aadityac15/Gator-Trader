function receivedMsg() {
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

window.onload = receivedMsg();
window.onload = function(dataSave){
    sessionStorage.setItem('userName', userName);
}

