/*
 * @Author: aadityac15
 * @Date:   2019-11-12 02:03:04
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-18 17:56:48
 * @Description : Redirect the page to the result page and use local storage to make the GET request.
 */

const redirectToResult = () => {
  const selectDropDownElement = document.getElementById("selectDropDown");
  const category =
    selectDropDownElement.options[selectDropDownElement.selectedIndex].value;
  let query = document.getElementById("queryTag").value;

  localStorage.setItem("query", query);
  localStorage.setItem("category", category);
  console.log(window.location.host + "/results");
  // window.location.href = window.location.host + "/results";
  window.location.pathname = "/results";
  // console.log(window.location.pathname);
};
