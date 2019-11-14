document.addEventListener("DOMContentLoaded", function() {
    let login_form = document.querySelector(".login-form");
    let reset_password = document.querySelector("#reset-password");
    let reset_form = document.querySelector(".reset-form");
    let admin_message = document.querySelector("#admin-message");
    let admin_login_form = document.querySelector(".admin-login-form");
    let admin_reset_password = document.querySelector("#admin-reset-password");

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
});
