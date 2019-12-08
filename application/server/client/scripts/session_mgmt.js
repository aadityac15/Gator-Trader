document.addEventListener("DOMContentLoaded", function() {
    /****
     * check if the user logged in, if the user logged in, then change the nav bar login to exit
      if the user didn't login then switch the exit to log in 
      if local storage == session storage
     */
    if(sessionStorage.getItem('user_id')){
        document.querySelector('#nav-login').innerHTML = 'Logout'
        document.querySelector('#dashboard').style.display = 'block'
        document.querySelector('#sell').style.display = 'block'

        document.querySelector('#nav-login').onclick = function(e){
            e.preventDefault()
            sessionStorage.clear();
            location.replace('../users/landing_page')
        }
    }

});