/*
 * @Author: aadityac15
 * @Date:   2019-11-12 02:03:04
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-20 11:14:00
 * @Description : Redirect the page to the result page and use local storage to make the GET request.
 */

// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "../../categories.txt",
//         dataType: "text",
//         success: function(data) {processData(data);}
//      });
// });

// function processData(allText) {
//     var record_num = 10;  // or however many elements there are in each row
//     var allTextLines = allText.split(/\r\n|\n/);
//     var entries = allTextLines[0].split(',');
//     var lines = [];

//     var headings = entries.splice(0,record_num);
//     while (entries.length>0) {
//         var tarr = [];
//         for (var j=0; j<record_num; j++) {
//             tarr.push(headings[j]+":"+entries.shift());
//         }
//         lines.push(tarr);
//     }
//     console.log(lines);
//     // alert(lines);
// }




const redirectToResult = async() => {
  
  await fetch("/categories", {
    method : "GET",
  }).then(response => {
    console.log(response);
  })

  const selectDropDownElement = document.getElementById("selectDropDown");
  const category =
    selectDropDownElement.options[selectDropDownElement.selectedIndex].value;
  let query = document.getElementById("queryTag").value;


  // Store the query and the category in the localStorage and redirect to the /results page to display the results.
  localStorage.setItem("query", query);
  localStorage.setItem("category", category);
  console.log(window.location.host + "/results");

  window.location.pathname = "/results";
};

const loadDropDown = () => {

}


// window.onload = () => {
//   loadDropDown();
// }