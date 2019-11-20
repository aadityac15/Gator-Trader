document.addEventListener("DOMContentLoaded", function() {
   document.querySelector("#Register").onclick = function(e){
        e.preventDefault();
        let password = document.querySelector("#password").value
        let confirmPassword = document.querySelector("#confirmPassword").value
        let checkbox = document.querySelector(".checkbox:checked")
        if(password !== confirmPassword){
            alert('Passwords did not match')
        }else if (password == "") {
            alert('Must type in Password')
        }else if (checkbox === null) {
            alert('Please accept the Terms & Privacy')
        }else{
            let firstName  =  document.querySelector("#first_name").value
            let lastName = document.querySelector("#last_name").value
            let userName = document.querySelector("#username").value
            let major = document.querySelector("#major").value
            let email = document.querySelector("#email").value
            let password = document.querySelector("#password").value
            let confirmPassword = document.querySelector("#confirmPassword").value
            /***
             * localStorage store
             */
            localStorage.setItem('firstName', firstName)
            localStorage.setItem('lastName',lastName)
            localStorage.setItem('userName', userName)
            localStorage.setItem('major',major)
            localStorage.setItem('email',email)
            localStorage.setItem('password',password)
            localStorage.setItem('confirmPassword',confirmPassword)
            /***
             * user logic to check if admin, then set admin_name == userName
             */
            localStorage.setItem('admin_name',userName)
            localStorage.setItem('admin_password',password)

            location.replace('http://localhost:5000/users/landing_page')
            // after signup, automatically login
            sessionStorage.setItem('userName', userName)
        }
     }     
    
});
