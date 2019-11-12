// function selectDropDown(sel) {
//   const category = sel.options[sel.selectedIndex].text;
//   // console.log(category);
// }

const fetchData = async () => {
  // const selectDropDownElement = document.getElementById("selectDropDown")
  // const category = selectDropDownElement.options[selectDropDownElement.selectedIndex].value;
  document.getElementById("queryTag").value = localStorage.getItem("query");
  console.log("The local storage is ", localStorage);
  // console.log(category);
  clearData(); //Temporary
  const query = document.getElementById("queryTag").value;
  console.log(query);

  const LISTINGS_URL = `http://localhost:3000/listings?category=${category}&query=${query}`;
  console.log(LISTINGS_URL);

  let dataReceived = undefined;
  let dataLength = 0;
  let name = "";
  let major = "";
  let dummyLength = 0;
  let dummyData = undefined;
  const table = document.querySelector("table");
  table.style["border"] = "1px black solid";

  // await fetch(LISTINGS_URL, {
  await fetch('http://localhost:3000/listings', {
    method: "GET"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dummyData = data;
      //As the data would be an object
      dummyLength = dummyData.length;
      console.log("Type of", typeof dummyData);
      console.log(dummyData);
      console.log("The length is", Object.keys(dummyData).length);

      for (let i = 0; i < dummyLength; i++) {
        let tr = document.createElement("tr");
        tr.style["border-bottom"] = "1px solid black";
        console.log(dummyData[i]);
        let dataCategories = Object.keys(dummyData[i]);

        let bTag = document.createElement("b");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        for (let j = 0; j < dataCategories.length; j++) {
          let bTag = document.createElement("b");
          let td1 = document.createElement("td");
          let td2 = document.createElement("td");

          td1.textContent = dataCategories[j];
          bTag.appendChild(td1);
          td2.textContent = dummyData[i][dataCategories[j]];
          // console.log("td = ", td);
          tr.appendChild(bTag);
          tr.appendChild(td2);

          td1.textContent = dataCategories[j];
          if (dataCategories[j] === "image") {
            let imgTag = document.createElement("img");
            imgTag.src = dummyData[i][dataCategories[j]];
            bTag.appendChild(td1);
          }
          td2.textContent = dummyData[i][dataCategories[j]];
          tr.appendChild(bTag);
          tr.appendChild(td2);

          console.log(tr);
          table.appendChild(tr);
        }
      }
    });
};

//Temporary clearing the space

const clearData = () => {
  const tableTag = document.querySelector("table");
  if (document.querySelector("tr")) {
    tableTag.removeChild(document.querySelector("tr"));
    tableTag.removeChild(document.querySelector("tr"));
  }
};
