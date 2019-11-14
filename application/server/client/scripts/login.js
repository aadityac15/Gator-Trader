document.addEventListener("DOMContentLoaded", function() {
    let login_form = document.querySelector(".login-form");
    let reset_password = document.querySelector("#reset-password");
    let reset_form = document.querySelector(".reset-form");
    let admin_message = document.querySelector("#admin-message");
    let admin_login_form = document.querySelector(".admin-login-form");
    let admin_reset_password = document.querySelector("#admin-reset-password");
    let submit_reset_password = document.querySelector(".submit-reset-password");
    let email_reset_form = document.querySelector(".email-reset-form");
    let reset_password_email = document.querySelector("#reset-password-email");
  

    reset_password.addEventListener("click", function () {
        login_form.style.display = "none";
        reset_form.style.display = "block";

    })

    admin_message.addEventListener("click", function () {
        login_form.style.display = "none";
        admin_login_form.style.display = "block";

    })

    admin_reset_password.addEventListener("click", function () {
        reset_form.style.display = "block";
        admin_login_form.style.display = "none";
    })

    /**
     * hard code for reset password
     */
    submit_reset_password .addEventListener("click", function () {
        event.preventDefault()

        if(reset_password_email.value.length != 0){
            reset_form.style.display = "none";
            email_reset_form .style.display = "block";
        }else{
            alert("All Field must be filled out");
        }
    })

    
});
