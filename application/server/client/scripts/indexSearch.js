/*
 * @Author: aadityac15
 * @Date:   2019-11-12 02:03:04
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-22 01:09:04
 * @Description : Redirect the page to the result page and use local storage to make the GET request.
 */

const redirectToResult = async () => {
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
  console.log("In the loadDropDown");
  await fetch("/categories", {
    method: "GET"
  }).then(response => {
    console.log("The response from /categories", response);
    return response.text()
  })
  .then(data => {
    console.log(data);
  })
};

window.onload = loadDropDown();
