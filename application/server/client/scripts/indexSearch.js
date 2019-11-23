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

const redirect1 = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[1].value;
    let query = document.getElementById("queryTag").value;

    localStorage.setItem("query", query)
    localStorage.setItem("category", category );
    console.log(window.location.host + "/results");
    window.location.pathname = '/results';

}

const redirect2 = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[2].value;
    let query = document.getElementById("queryTag").value;

    localStorage.setItem("query", query)
    localStorage.setItem("category", category);
    console.log(window.location.host + "/results");
    window.location.pathname = '/results';

}

const redirect3 = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[3].value;
    let query = document.getElementById("queryTag").value;

    localStorage.setItem("query", query)
    localStorage.setItem("category", category);
    console.log(window.location.host + "/results");
    window.location.pathname = '/results';

}

const redirect4 = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[4].value;
    let query = document.getElementById("queryTag").value;

    localStorage.setItem("query", query)
    localStorage.setItem("category", category);
    console.log(window.location.host + "/results");
    window.location.pathname = '/results';

}

const redirect5 = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[5].value;
    let query = document.getElementById("queryTag").value;

    localStorage.setItem("query", query)
    localStorage.setItem("category", category);
    console.log(window.location.host + "/results");
    window.location.pathname = '/results';

}

const redirect6 = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[6].value;
    let query = document.getElementById("queryTag").value;

    localStorage.setItem("query", query)
    localStorage.setItem("category", category);
    console.log(window.location.host + "/results");
    window.location.pathname = '/results';

}

const redirect7 = () => {
    const selectDropDownElement = document.getElementById("selectDropDown");
    const category =
    selectDropDownElement.options[7].value;
    let query = document.getElementById("queryTag").value;

    localStorage.setItem("query", query)
    localStorage.setItem("category", category);
    console.log(window.location.host + "/results");
    window.location.pathname = '/results';

}