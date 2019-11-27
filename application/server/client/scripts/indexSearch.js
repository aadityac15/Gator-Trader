/*
 * @Author: aadityac15
 * @Date:   2019-11-12 02:03:04
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-24 17:11:36
 * @Description : Redirect the page to the result page and use local storage to make the GET request.
 */

// used in landingPage.js

let categoriesArray = [];

const redirectToResult = () => {

  const selectDropDownElement = document.getElementById("selectDropDown");
  const category =
    selectDropDownElement.options[selectDropDownElement.selectedIndex].value;
  let query = document.getElementById("queryTag").value;

  // Store the query and the category in the localStorage and redirect to the /results page to display the results.
  localStorage.setItem("query", query);
  localStorage.setItem("category", category);
  window.location.pathname = "/results";
};

const loadDropDown = async () => {
  const selectDropDownElement = document.getElementById("selectDropDown");
  await fetch("/categories", {
    method: "GET"
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      categoryArray = jsonData["categories"];
      // let categoryDropDown = document.getElementById("")
      categoryArray.map(category => {
        let option = document.createElement("option");
        option.value = category;
        option.text = category;
        selectDropDownElement.add(option);
      });
    });
};

// const redirect1 = () => {
//   // const selectDropDownElement = document.getElementById("selectDropDown");
//   const category = selectDropDownElement.options[1].value;
//   let query = document.getElementById("queryTag").value;

//   localStorage.setItem("query", query);
//   localStorage.setItem("category", category);
//   console.log(window.location.host + "/results");
//   window.location.pathname = "/results";
// };

// const redirect2 = () => {
//   // const selectDropDownElement = document.getElementById("selectDropDown");
//   const category = selectDropDownElement.options[2].value;
//   let query = document.getElementById("queryTag").value;

//   localStorage.setItem("query", query);
//   localStorage.setItem("category", category);
//   console.log(window.location.host + "/results");
//   window.location.pathname = "/results";
// };

// const redirect3 = () => {
//   // const selectDropDownElement = document.getElementById("selectDropDown");
//   const category = selectDropDownElement.options[3].value;
//   let query = document.getElementById("queryTag").value;

//   localStorage.setItem("query", query);
//   localStorage.setItem("category", category);
//   console.log(window.location.host + "/results");
//   window.location.pathname = "/results";
// };

// const redirect4 = () => {
//   // const selectDropDownElement = document.getElementById("selectDropDown");
//   const category = selectDropDownElement.options[4].value;
//   let query = document.getElementById("queryTag").value;

//   localStorage.setItem("query", query);
//   localStorage.setItem("category", category);
//   console.log(window.location.host + "/results");
//   window.location.pathname = "/results";
// };

// const redirect5 = () => {
//   // const selectDropDownElement = document.getElementById("selectDropDown");
//   const category = selectDropDownElement.options[5].value;
//   let query = document.getElementById("queryTag").value;

//   localStorage.setItem("query", query);
//   localStorage.setItem("category", category);
//   console.log(window.location.host + "/results");
//   window.location.pathname = "/results";
// };

// const redirect6 = () => {
//   // const selectDropDownElement = document.getElementById("selectDropDown");
//   const category = selectDropDownElement.options[6].value;
//   let query = document.getElementById("queryTag").value;

//   localStorage.setItem("query", query);
//   localStorage.setItem("category", category);
//   console.log(window.location.host + "/results");
//   window.location.pathname = "/results";
// };

// const redirect7 = () => {
//   // const selectDropDownElement = document.getElementById("selectDropDown");
//   const category = selectDropDownElement.options[7].value;
//   let query = document.getElementById("queryTag").value;

//   localStorage.setItem("query", query);
//   localStorage.setItem("category", category);
//   console.log(window.location.host + "/results");
//   window.location.pathname = "/results";
// };

window.onload = loadDropDown();
