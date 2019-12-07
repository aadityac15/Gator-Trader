/*
 * @Author: aadityac15
 * @Date:   2019-11-12 02:03:04
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-27 18:53:31
 * @Description : Redirect the page to the result page and use locdocument.getElementById("queryTag").addEventListener("keyup", (event) => {})al storage to make the GET request.
 */

// used in landingPage.js

document.getElementById("queryTag").addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

let categoriesArray = [];

const redirectToResult = () => {
  localStorage.removeItem("query");
  localStorage.removeItem("category");
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
  // localStorage.removeItem("category");
  const selectDropDownElement = document.getElementById("selectDropDown");
  console.log("SDE first child " + JSON.stringify(selectDropDownElement));
  // debugger;
  if (selectDropDownElement.length === 0) {
    await fetch("/categories", {
      method: "GET"
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
        const jsonData = JSON.parse(data);
        categoryArray = jsonData["categories"];
        categoryArray.map(category => {
          let option = document.createElement("option");
          option.value = category;
          option.text = category;
          selectDropDownElement.add(option);
          if (document.getElementById(category)) {
            document.getElementById(category).textContent = category;
            document.getElementById(category).addEventListener("click", () => {
              localStorage.setItem("category", category);
              window.location.pathname = "/results";
            });
          }
        });
      });
  } else {
    console.log("Already done");
  }
};

window.onload = loadDropDown();
