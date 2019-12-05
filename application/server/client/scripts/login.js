document.addEventListener("DOMContentLoaded", function() {

    /***
     * login form
     */
    let login_form = document.querySelector(".login-form")
    let login_username = document.querySelector("#login-username")
    let login_password = document.querySelector("#login-password")
    let login_button = document.querySelector("#login_button")


    /***
     * reset-password form
     */
    let reset_password = document.querySelector("#reset-password")
    let reset_form = document.querySelector(".reset-form")
    let submit_reset_password = document.querySelector(".submit-reset-password")

   
    /*****
     * email-reset form
     */
    let email_reset_form = document.querySelector(".email-reset-form")
    let reset_password_email = document.querySelector("#reset-password-email")
  
    reset_password.addEventListener("click", function () {
        login_form.style.display = "none"
        reset_form.style.display = "block"

    })

    /**
     * hard code for reset password
     */
    submit_reset_password .addEventListener("click", function () {
        event.preventDefault()

        if(reset_password_email.value.length != 0){
            reset_form.style.display = "none"
            email_reset_form .style.display = "block"
        }else{
            alert("All Field must be filled out")
        }
    })

    /*****
     * validation client for login 
     * check login username and password from the local storage
     */

     /***
      * validation for regiestered users
      */
    document.querySelector("#login").onclick = function (e){
        e.preventDefault();
        let storeName = localStorage.getItem('userName')
        let storePassword = localStorage.getItem('password')

         if(login_username.value.length !=0 && login_password.value.length != 0){
                
                if(login_username.value == storeName && login_password.value == storePassword){

                    //do sessionStorage to keep user sigin
                    //redirect to page
                        sessionStorage.setItem('userName',storeName)
                        window.location.replace('http://localhost:5000/users/landing_page')
                        // document.querySelector("#nav-login").innerHTML = 'Logout'
                    
                }else{
            
                    alert('Incorrect username or password')
                }
         }
     }
    
});
