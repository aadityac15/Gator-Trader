document.addEventListener("DOMContentLoaded", function() {
    //check if the user logged in, if the user logged in, then change the nav bar login to exit
    //if the user didn't login then switch the exit to log in 
    // if local storage == session storage
    
    if(sessionStorage.getItem('userName')){
        document.querySelector('#nav-login').innerHTML = 'Logout'

        document.querySelector('#nav-login').onclick = function(e){
            e.preventDefault()
            sessionStorage.removeItem('userName')
            location.replace('http://localhost:5000/users/landing_page')
        }
    }


    if(sessionStorage.getItem('admin_username')){
        document.querySelector('#nav-login').innerHTML = 'Logout'

        document.querySelector('#nav-login').onclick = function(e){
            e.preventDefault()
            sessionStorage.removeItem('admin_username')
            location.replace('http://localhost:5000/users/landing_page')
        }
    }

});