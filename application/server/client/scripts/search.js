// document.querySelector("body").addEventListe/ner("onLoad", () => fetchData());
const selectDropDown = sel => {
  let category = sel.options[sel.selectedIndex].text;
  // console.log(category);
};

const fetchData = async () => {
  // let category = '';
  // let query =  "";
  const ulResult = document.getElementById("resultList");
  // clearData(); //Temporary
  console.log("The local storage is ", localStorage);
  document.getElementById("queryTag").value = localStorage.getItem("query");
  let category = localStorage.getItem("category");
  if (category !== null) {
    document.getElementById("selectDropDown").value = category;
  }

  // query = localStorage.getItem("query");
  let query = document.getElementById("queryTag").value;
  // Domcreator.js
  ulResult.classList.add("list-group");
  if (category === "All Categories") {
    category = "";
  }
  if (category === null || query === null) {
    category = "";
    query= ""
    }
  console.log(category);
  const LISTINGS_URL = `listings?category=${category}&query=${query}`;
  console.log("The losoting url", LISTINGS_URL);

  await fetch(LISTINGS_URL, {
    method: "GET"
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      let dataJson = JSON.parse(data);
      console.log(dataJson);
      console.log("Type of data", typeof dataJson);
      let dummyData = dataJson["listings"];
      //As the data would be an object
      dummyLength = dummyData.length;
      dummyData.map(indList => {
        const titleBTag = createDomElement("b");
        const h2Tag = createDomElement("h2");
        const h4Tag = createDomElement("h4");
        const imgDivTag = createDomElement("div");
        const imgTag = createDomElement("img");
        const typeTag = createDomElement("p");
        const descriptionTag = createDomElement("p");
        const listingTag = createDomElement("p");
        const priceTag = createDomElement("p");
        const titleTag = createDomElement("p");
        const anchorTag = createDomElement("a");
        let p = document.createTextNode("See More");
        anchorTag.appendChild(p);
        anchorTag.classList.add("nav-item");
        anchorTag.href = "/terms";
        const divTag = createDomElement("div");
        let liTag = createDomElement("li");
        styleLi(liTag);

        // Image / Thumbnails.
        if (indList["thumbnail"] !== null) {
          imgTag.src = indList["thumbnail"];
        } else {
          imgTag.src = "https://via.placeholder.com/150";
        }
        imgDivTag.appendChild(imgTag);
        styleImgDivTag(imgDivTag); // Styles the img div tag.
        liTag.appendChild(imgDivTag);

        // Commented code at the bottom goes here.

        // Title Tag and  styling
        titleTag.innerText = indList["title"];
        h2Tag.appendChild(titleTag);
        titleBTag.appendChild(h2Tag);

        // Description and other tags.
        descriptionTag.innerText = indList["description"];
        listingTag.innerText = indList["listing_id"];
        listingTag.hidden = true;
        priceTag.innerText = indList["price"] + "$";
        typeTag.innerText = indList["type"];
        h4Tag.appendChild(typeTag);
        // Style tags to remvove padding
        styleTags([listingTag, descriptionTag, titleTag, priceTag]);
        divTag.appendChild(titleBTag);
        divTag.appendChild(listingTag);
        divTag.appendChild(descriptionTag);
        divTag.appendChild(priceTag);
        divTag.appendChild(anchorTag);
        styleDiv(divTag);
        liTag.appendChild(divTag);
        liTag.classList.add("list-group-item");
        ulResult.appendChild(liTag);
      });

      category = "";
      query = "";
      localStorage.clear();
    });
};

const styleTags = element => {
  element.map(elem => {
    elem.classList.add("remove-margin");
  });
};

const clearData = () => {
  // const resultUl = document.getElementById("resultList");
  // element.parentNode.removeChild(element);
  // const tableTag = document.getElementById("resultList");
  // if (document.querySelector("li")) {
  //   element.removeChild(document.querySelector("li"));

  //  while(resultUl.firstChild ){
  //   resultUl.removeChild( resultUl.firstChild );
  // }

  document.getElementById("resultList").innerHTML = " ";
};

const styleLi = liTag => {
  liTag.style["display"] = "flex";
  liTag.style["flex-direction"] = "row";
  liTag.style["justify-content"] = "space-around";
};

const styleDiv = divTag => {
  divTag.style["display"] = "flex";
  divTag.style["flex-direction"] = "column";
  divTag.style["justify-content"] = "flex-start";
  divTag.style["width"] = "80%";
};

const styleImgDivTag = imgDivTag => {
  // imgDivTag.style["width"] = "20%";
};

window.onload = () => {
  fetchData();
};

// The object is a json object.
// let dataCategories = Object.keys(dummyData[i]);

// Parsing through all the categories and making the corresponding rows.
// for (let j = 0; j < dataCategories.length; j++) {
//   // Styling the table row.
//   tr.style["border-bottom"] = "1px solid black";
//   let bTag = createDomElement("b"); // Bold Tag
//   let pTag = createDomElement("p"); // p tag for the text in the table.
//   if (
//     ["sold_by", "title", "image", "category", "listing_id"].includes(
//       dataCategories[j]
//     )
//   ) {
//     // Setting the value.
//     if (dataCategories[j] === "image") {
//       let imgTag = createDomElement("img");
//       imgTag.src = dummyData[i][dataCategories[j]];
//       td1.appendChild(imgTag);
//     }
//     else {

//       // Title to be bold.
//       if (dataCategories[j] === "title") {
//       pTag.textContent = dummyData[i][dataCategories[j]];
//        bTag.appendChild(pTag);
//        div.appendChild(bTag);
//       }
//       else {
//         pTag.textContent = dummyData[i][dataCategories[j]];
//         div.appendChild(pTag);
//       }
//     }
//     div.classList.add("center-align", "flex-start");
//     td2.appendChild(div);

//     // Append child is used to inject the tag in the dom.