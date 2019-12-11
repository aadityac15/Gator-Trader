// document.querySelector("body").addEventListe/ner("onLoad", () => fetchData());

const selectDropDown = (sel) => {
  let category = sel.options[sel.selectedIndex].text;
}

const fetchData = async () => {
  const ulResult = document.getElementById("resultList");
  let category = document.getElementById('selectDropDown').value;
  // query = localStorage.getItem("query");
  let query = document.getElementById("queryTag").value;
  // Domcreator.js
  ulResult.classList.add("list-group");
  if (category==="All Categories"  || category === "All") {
    category= "";
  }
  const LISTINGS_URL = `listings?category=${category}&query=${query}`;

  await fetch(LISTINGS_URL, {
    method: "GET"
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      let dataJson = JSON.parse(data);
      let dummyData = dataJson["listings"];
      //As the data would be an object
      dummyLength = dummyData.length;
      dummyData.map(indList => {
        const titleBTag = createDomElement("b");
        const h2Tag = createDomElement("h2");
        const h4Tag = createDomElement("h4");
        const imgSpanTag = createDomElement("span");
        const imgTag = createDomElement("img");
        const typeTag = createDomElement("p")
        const descriptionTag = createDomElement("p");
        const listingTag = createDomElement("p");
        const priceTag = createDomElement("p");
        const titleTag = createDomElement("p");

        const spanTag = createDomElement("span");
        let liTag = createDomElement("li");
        styleLi(liTag);

        // Image / Thumbnails.
        if (indList["thumbnail"] !== null) {
          imgTag.src = indList["thumbnail"];
        } else {
          imgTag.src = "https://via.placeholder.com/150";
          // divTag.appendChild(imgTag);
        }
        imgSpanTag.appendChild(imgTag);
        styleImgSpanTag(imgSpanTag); // Styles the img div tag.
        liTag.appendChild(imgSpanTag);

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
        spanTag.appendChild(titleBTag);
        spanTag.appendChild(listingTag);
        spanTag.appendChild(descriptionTag);
        // spanTag.appendChild(h4Tag);
        spanTag.appendChild(priceTag);

        styleDiv(spanTag);
        liTag.appendChild(spanTag);
        liTag.classList.add("list-group-item");
        ulResult.appendChild(liTag);
      });

      category = "";
      query = "";
      localStorage.removeItem("category");
      localStorage.remvoveItem("query");
    });
};

const styleTags = element => {
  element.map(elem => {
    elem.classList.add("remove-margin");
  });
};

const clearData = () => {
 
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

const styleImgSpanTag = imgSpanTag => {
  // imgSpanTag.style["width"] = "20%";
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
