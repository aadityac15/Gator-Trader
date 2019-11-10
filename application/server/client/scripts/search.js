function selectDropDown(sel) {
  const category = sel.options[sel.selectedIndex].text;
}

const fetchData = async () => {
  // Domcreator.js
  // clearData(); //Temporary
  const selectDropDownElement = document.getElementById("selectDropDown");
  const category =
    selectDropDownElement.options[selectDropDownElement.selectedIndex].value;
  const query = document.getElementById("queryTag").value;

  const LISTINGS_URL = `http://localhost:3000/listings?category=${category}&query=${query}`;
  let dummyLength = 0;
  let dummyData = undefined;
  const table = createDomElement("table");
  table.style["border"] = "1px black solid";

  await fetch("/listings", {
    method: "GET"
  })
    .then(response => {
      console.log(response);
      response.json();
    })
    .then(data => {
      console.log(data);
      dummyData = data;
      //As the data would be an object
      dummyLength = dummyData.length;
      for (let i = 0; i < dummyLength; i++) {
        // Creation of Tags.
        let tr = createDomElement("tr");
        let td1 = createDomElement("td"); // Td tag for the tables.
        let td2 = createDomElement("td"); // td tag for the tables.
        let div = createDomElement("div");

        // The object is a json object.
        let dataCategories = Object.keys(dummyData[i]);

        // Parsing through all the categories and making the corresponding rows.
        for (let j = 0; j < dataCategories.length; j++) {
          // Styling the table row.
          tr.style["border-bottom"] = "1px solid black";
          let bTag = createDomElement("b"); // Bold Tag
          let pTag = createDomElement("p"); // p tag for the text in the table.
          if (
            ["sold_by", "title", "image", "category", "listing_id"].includes(
              dataCategories[j]
            )
          ) {
            // Setting the value.
            if (dataCategories[j] === "image") {
              let imgTag = createDomElement("img");
              imgTag.src = dummyData[i][dataCategories[j]];
              td1.appendChild(imgTag);
            } 
            else {

              // Title to be bold.
              if (dataCategories[j] === "title") {
              pTag.textContent = dummyData[i][dataCategories[j]];
               bTag.appendChild(pTag);
               div.appendChild(bTag); 
              }
              else {
                pTag.textContent = dummyData[i][dataCategories[j]];
                div.appendChild(pTag);
              }
            }
            div.classList.add("center-align", "flex-start");
            td2.appendChild(div);

            // Append child is used to inject the tag in the dom.
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
          }
        }
      }
    });
};


