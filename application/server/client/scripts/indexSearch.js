// function selectDropDown(sel) {
//     const category = sel.options[sel.selectedIndex].text;
//   }


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