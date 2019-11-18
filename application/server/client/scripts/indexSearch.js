// function selectDropDown(sel) {
//     const category = sel.options[sel.selectedIndex].text;
//   }

// input.addEventListener("keyup", function(event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//       // Cancel the default action, if needed
//       event.preventDefault();
//       // Trigger the button element with a click
//       document.getElementById("searchBtn").click();
//     }




const redirectToResult = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[selectDropDownElement.selectedIndex].value;
    let query = document.getElementById("queryTag").value;


    localStorage.setItem("query", query)
    localStorage.setItem("category", category );
    console.log(window.location.host + "/results");
    // window.location.href = window.location.host + "/results";
    window.location.pathname = '/results';
    // console.log(window.location.pathname);
}