/*
* @Author: aadityac15
* @Date:   2019-11-07 19:20:20
* @Last Modified by:   aadityac15
* @Last Modified time: 2019-11-18 15:59:03
*/
const selectDropDown = sel => {
  let category = sel.options[sel.selectedIndex].text;
  // console.log(category);
};

const fetchData = async () => {
  // let category = '';
  // let query =  "";
  const ulResult = document.getElementById("resultList");
  document.getElementById("queryTag").value = localStorage.getItem("query");

  // clearData(); //Temporary
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

  // handle refrersh
  if (category === null || query === null ){
    category = "";
    query = "";
  }


  console.log(category);
  const LISTINGS_URL = `listings?query=${query}&category=${category}`;

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

      if (dummyData.length === 0) {
        let textNode = document.createTextNode("Your search did not match any of the items. Please try another item.")
        ulResult.appendChild(textNode);
      }


      //As the data would be an object
      dummyLength = dummyData.length;
      dummyData.map(indList => {
        const titleBTag = createDomElement("b");
        const h2Tag = createDomElement("h2");
        const h4Tag = createDomElement("h4");
        const imgDivTag = createDomElement("div");
        const spanTag = createDomElement("span");
        const imgTag = createDomElement("img");
        const typeTag = createDomElement("p");
        const descriptionTag = createDomElement("p");
        const listingTag = createDomElement("p");
        const priceTag = createDomElement("p");
        const titleTag = createDomElement("p");
        const buttonTag = createDomElement("button");
        buttonTag.innerText = "See More";
        buttonTag.onclick = () => {redirectToIndividualListing(indList["listing_id"], indList["title"]);} // Creating the individual file.
        buttonTag.classList.add("btn", "btn-warning");
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
        priceTag.innerText = "$" + indList["price"];
        typeTag.innerText = indList["type"];
        h4Tag.appendChild(typeTag);
       
        // Style tags to remvove padding
        styleTags([listingTag, descriptionTag, titleTag, priceTag]);
        divTag.appendChild(titleBTag);
        divTag.appendChild(listingTag);
        divTag.appendChild(descriptionTag);
        divTag.appendChild(priceTag);
        spanTag.appendChild(buttonTag);
        divTag.appendChild(spanTag);
        styleDiv(divTag);
        liTag.appendChild(divTag);
        liTag.classList.add("list-group-item");
        ulResult.appendChild(liTag);
      });

      category = "";
      query = "";
      localStorage.removeItem("query");
      localStorage.removeItem("category")
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

const styleImgDivTag = imgDivTag => {
  // imgDivTag.style["width"] = "20%";
};

const redirectToIndividualListing = (id, title) => {
  localStorage.setItem("id" , id);
  localStorage.setItem("title",title);
  window.location.pathname = '/details';

}

window.onload = () => { fetchData(); }

