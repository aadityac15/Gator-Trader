/*
 * @Author: aadityac15
 * @Date:   2019-11-07 19:20:20
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-11-27 18:59:04
 * @Description: Search the database according to the query, and display results.
 */

const fetchData = async () => {
  let category = localStorage.getItem("category");

  if (localStorage.getItem("category") !== null) {
    document.getElementById("selectDropDown").value = category;
  } else {
    document.getElementById("selectDropDown").value = "All Categories";
  }
  localStorage.removeItem("id");
  localStorage.removeItem("title");
  const ulResult = document.getElementById("resultList");
  document.getElementById("queryTag").value = localStorage.getItem("query");

  // query = localStorage.getItem("query");
  let query = document.getElementById("queryTag").value;
  // Domcreator.js
  ulResult.classList.add("list-group");

  if (category === "All Categories") {
    category = "";
  }

  // handle refrersh i.e show everything if after refresh either of the parameters are null.
  if (category === null || query === null) {
    category = "";
    query = "";
  }

  const LISTINGS_URL = `listings?query=${query}&category=${category}`;

  await fetch(LISTINGS_URL, {
    method: "GET",
    withCredentials: true
  })
    .then(response => {
      if (response === undefined) {
      } else {
        return response.text();
      }
    })
    .then(data => {
      if (data === undefined) {
        let textNode = document.createTextNode(
          "Your search did not match any of the items. Please try another Search query."
        );
        ulResult.appendChild(textNode);
      }
      let dataJson = JSON.parse(data);
      let dummyData = dataJson["listings"];
      if (dummyData.length === 0) {
        let textNode = document.createTextNode(
          "Your search did not match any of the items. Please try another Search query."
        );
        ulResult.appendChild(textNode);
      }

      //As the data would be an object

      dummyData.map(indList => {
        //  Creation of the elements.
        const titleBTag = createDomElement("b"); // Bold Tag
        const h2Tag = createDomElement("h2"); // h2 Tag for text
        const h4Tag = createDomElement("h4"); // h4 tag for text
        const imgDivTag = createDomElement("div"); // Div tag to hold the elements.
        const buttonSpanTag = createDomElement("span"); // span tag for the buttons
        const imgTag = createDomElement("img"); // Image tag in the DOM
        const typeTag = createDomElement("p");
        const descriptionTag = createDomElement("p");
        const listingTag = createDomElement("p");
        const priceTag = createDomElement("p");
        const titleTag = createDomElement("p");
        const buttonTag = createDomElement("button"); // Button tag in the DOM.
        buttonTag.innerText = "See More";
        const contactSellerButton = createDomElement("button");
        contactSellerButton.innerText = "Contact Seller";
        contactSellerButton.classList.add("btn", "btn-warning");

        contactSellerButton.setAttribute("id", "myForm");
        buttonTag.style["margin-right"] = "10px";
        buttonSpanTag.style["width"] = "80%";

        // Redirect to the details page.

        buttonTag.onclick = () => {
          redirectToIndividualListing(indList["listing_id"], indList["title"]);
        };

        buttonSpanTag.classList.add("flex-display-row");

        buttonTag.classList.add("btn", "btn-warning");
        const divTag = createDomElement("div");
        let liTag = createDomElement("li");
        styleLi(liTag);

        // Add Image / Thumbnails src if present, else show placeholder image.
        if (indList["thumbnail"] !== null) {
          imgTag.src = indList["thumbnail"];
        } else {
          imgTag.src = "https://via.placeholder.com/150";
        }
        imgDivTag.appendChild(imgTag);
        styleImgDivTag(imgDivTag); // Styles the img div tag.
        liTag.appendChild(imgDivTag);

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
        buttonSpanTag.appendChild(buttonTag);
        buttonSpanTag.appendChild(contactSellerButton);
        divTag.appendChild(buttonSpanTag);
        styleDiv(divTag);
        liTag.appendChild(divTag);
        liTag.classList.add("list-group-item");
        ulResult.appendChild(liTag);
      });

      localStorage.removeItem("query");
      localStorage.removeItem("category");
      // console.log(localStorage);
    });
};

const styleTags = element => {
  element.map(elem => {
    elem.classList.add("remove-margin");
  });
};

const clearData = () => {
  document.getElementById("resultList").innerHTML = "";
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

const styleImgDivTag = imgDivTag => {};

// Redirecrts to the detail.html page showing details about the individual listing.

const redirectToIndividualListing = (id, title) => {
  localStorage.setItem("id", id);
  localStorage.setItem("title", title);
  // let webPath = window.location.hostname;
  window.open(`/details`, "_blank");
};

const formMessage = event => {
  var modal = document.getElementById("form");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.onload = () => {
  if (localStorage.getItem("category") !== null) {
    document.getElementById("selectDropDown").value = localStorage.getItem(
      "category"
    );
  } else {
    document.getElementById("selectDropDown").value = "All Categories";
  }
  fetchData();
};
