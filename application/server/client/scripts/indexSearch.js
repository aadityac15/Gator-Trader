/*
 * @Author: aadityac15
 * @Date:   2019-11-12 02:03:04
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-15 01:37:12
 * @Description : Redirect the page to the result page. The categories are put in from the categories.csv.
 */

// used in landingPage.js

// Enter press does search.
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

const redirectToRecommended = () => {
  window.location.pathname = "/recommended";
};

const loadDropDown = async () => {
  const selectDropDownElement = document.getElementById("selectDropDown");
  const sellListingDropDown = document.getElementById(
    "sellListingSelectDropdown"
  );

  if (selectDropDownElement.length === 0) {
    await fetch("/categories", {
      method: "GET"
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
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
          if (sellListingDropDown !== null) {
            let option = document.createElement("option");
            option.value = category;
            option.text = category;
            sellListingDropDown.add(option);
          }
        });
      });
  } else {
    console.log("Already done");
  }
};

loadDropDown();
