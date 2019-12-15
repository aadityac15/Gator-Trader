/*
 * @Author: aadityac15
 * @Date: 2019-12-07 23:45:46
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-10 16:16:55
 * @Description: Fetch the listings from the backend and populate individual listing.
 */

document.getElementById("queryTag").addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

const fetchData = async () => {
  let category = localStorage.getItem("category");
  let noResultTag = document.getElementById("noResultTag");
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
        noResultTag.appendChild(textNode);
      }
      let dataJson = JSON.parse(data);
      let dummyData = dataJson["listings"];
      if (dummyData.length === 0) {
        let textNode = document.createTextNode(
          "Your search did not match any of the items. Please try another Search query. You can also take a look at some of these items:"
        );
        noResultTag.appendChild(textNode);
        // Show all the items if the search result is none.
        localStorage.removeItem("category"); // Remove previous values in the localStorage
        localStorage.removeItem("query");
        localStorage.setItem("category", "All Categories"); // set new Values.
        localStorage.setItem("query", "");
        fetchData();
      }

      let dataLength = dummyData.length;
      document.getElementById("displayCount").textContent = dataLength;
      document.getElementById("resultCount").textContent = dataLength;
      //As the data would be an object
      dummyData.map(indList => {
        //  Creation of the elements.
        const titleDiv = createDomElement("div");
        const titleBTag = createDomElement("b"); // Bold Tag
        const h2Tag = createDomElement("h2"); // h2 Tag for text
        const h4Tag = createDomElement("h4"); // h4 tag for text
        const imgDivTag = createDomElement("div"); // Div tag to hold the elements.
        const buttonSpanTag = createDomElement("span"); // span tag for the buttons
        const imgTag = createDomElement("img"); // Image tag in the DOM
        const brTag = createDomElement("br");
        imgTag.classList.add("img-fluid", "img-thumbnail");
        const typeTag = createDomElement("p");
        const descriptionDiv = createDomElement("div");
        const descriptionTag = createDomElement("p");
        const listingTag = createDomElement("p");
        const priceTag = createDomElement("p");
        const titleTag = createDomElement("p");
        const buttonTag = createDomElement("button"); // Button tag in the DOM.
        buttonTag.innerText = "See More";
//        const contactSellerButton = createDomElement("button");
//        contactSellerButton.innerText = "Contact Seller";
//        contactSellerButton.classList.add("btn", "btn-warning");
//
//        contactSellerButton.setAttribute("id", "myForm");
        buttonTag.style["margin-right"] = "10px";
        buttonSpanTag.style["width"] = "80%";

        // Redirect to the details page.

        buttonTag.onclick = () => {
          redirectToIndividualListing(indList["listing_id"], indList["title"]);
        };

        buttonSpanTag.classList.add("flex-display-row", "make-responsive");

        buttonTag.classList.add("btn", "btn-warning");
        const divTag = createDomElement("div");
        let liTag = createDomElement("li");
        styleLi(liTag);

        // Add Image / Thumbnails src if present, else show placeholder image.
        if (indList["thumbnail"] !== null) {
          imgTag.src = indList["thumbnail"];
          imgTag.width = 150;
          imgTag.height = 150;
        } else {
          imgTag.src = "https://via.placeholder.com/150";
        }
        // styleImgTag(imgTag);
        imgDivTag.appendChild(imgTag);
        imgDivTag.style["flex-grow"] = 1;
        liTag.appendChild(imgDivTag);

        // Title Tag and  styling
        titleTag.innerText = indList["title"];
        h2Tag.appendChild(titleTag);
        titleBTag.appendChild(h2Tag);

        // Description and other tags.
        descriptionTag.innerText = indList["description"];
        descriptionDiv.appendChild(descriptionTag);
        // Styling description tag.
        styleDescriptionDiv(descriptionDiv);

        listingTag.innerText = indList["listing_id"];
        listingTag.hidden = true;
        priceTag.innerText = "$" + indList["price"];
        typeTag.innerText = indList["type"];
        h4Tag.appendChild(typeTag);

        // Style tags to remvove padding
        styleTags([listingTag, descriptionTag, titleTag, priceTag]);
        titleDiv.appendChild(titleBTag);
//        titleDiv.style["overflow"] = "auto";

        // Injecting elements to the DOM.
        divTag.appendChild(titleDiv);

        divTag.appendChild(listingTag);
        divTag.appendChild(descriptionDiv);
        divTag.appendChild(priceTag);
        buttonSpanTag.appendChild(buttonTag);
//        buttonSpanTag.appendChild(contactSellerButton);
        divTag.appendChild(buttonSpanTag);
        styleDiv(divTag);
        divTag.style["flex-grow"] = 1;
        liTag.appendChild(divTag);
        liTag.classList.add("list-group-item");
        ulResult.appendChild(liTag);
      });

      localStorage.removeItem("query");
      localStorage.removeItem("category");
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

// Redirecrts to the detail.html page showing details about the individual listing.

const redirectToIndividualListing = (id, title) => {
  localStorage.setItem("id", id);
  localStorage.setItem("title", title);
  // let webPath = window.location.hostname;
  window.open(`/details`, "_blank");
};


const styleImgTag = () => {
  imgTag.classList.add("img-fluid", "img-thumbnail");
  console.log(imgTag);
};

const styleDescriptionDiv = descriptionDiv => {
  descriptionDiv.style["width"] = "100%";
  descriptionDiv.style["height"] = "25%";
};

const fetchRecommendedListings = async () => {
  let noResultTag = document.getElementById("noResultTag");
  const ulResult = document.getElementById("resultList");
  ulResult.classList.add("list-group");
  let user_id = sessionStorage.getItem('user_id');

  await fetch(`/recommended_listings?user_id=${user_id}`, {
    method: "GET",
    withCredentials: true
  })
  .then(response => {
    console.log("RECOMMENDED THEN");
    if (response === undefined) {
    } else {
      return response.text();
    }
  })
  .then(data => {
    let recommendedListingsObject = JSON.parse(data);
    let recommendedListings = recommendedListingsObject['listings'];
    if (recommendedListings.length == 0) {
      let textNode = document.createTextNode(
          "Your search did not match any of the items. Please try another Search query. You can also take a look at some of these items:"
      );
      noResultTag.appendChild(textNode);
      return;
    }

    recommendedListings.map(indList => {
      //  Creation of the elements.
      const titleDiv = createDomElement("div");
      const titleBTag = createDomElement("b"); // Bold Tag
      const h2Tag = createDomElement("h2"); // h2 Tag for text
      const h4Tag = createDomElement("h4"); // h4 tag for text
      const imgDivTag = createDomElement("div"); // Div tag to hold the elements.
      const buttonSpanTag = createDomElement("span"); // span tag for the buttons
      const imgTag = createDomElement("img"); // Image tag in the DOM
      const brTag = createDomElement("br");
      imgTag.classList.add("img-fluid", "img-thumbnail");
      const typeTag = createDomElement("p");
      const descriptionDiv = createDomElement("div");
      const descriptionTag = createDomElement("p");
      const listingTag = createDomElement("p");
      const priceTag = createDomElement("p");
      const titleTag = createDomElement("p");
      const buttonTag = createDomElement("button"); // Button tag in the DOM.
      buttonTag.innerText = "See More";
      buttonTag.style["margin-right"] = "10px";
      buttonSpanTag.style["width"] = "80%";

      // Redirect to the details page.

      buttonTag.onclick = () => {
        redirectToIndividualListing(indList["listing_id"], indList["title"]);
      };

      buttonSpanTag.classList.add("flex-display-row", "make-responsive");

      buttonTag.classList.add("btn", "btn-warning");
      const divTag = createDomElement("div");
      let liTag = createDomElement("li");
      styleLi(liTag);

      // Add Image / Thumbnails src if present, else show placeholder image.
      if (indList["thumbnail"] !== null) {
        imgTag.src = indList["thumbnail"];
        imgTag.width = 150;
        imgTag.height = 150;
      } else {
        imgTag.src = "https://via.placeholder.com/150";
      }
      // styleImgTag(imgTag);
      imgDivTag.appendChild(imgTag);
      imgDivTag.style["flex-grow"] = 1;
      liTag.appendChild(imgDivTag);

      // Title Tag and  styling
      titleTag.innerText = indList["title"];
      h2Tag.appendChild(titleTag);
      titleBTag.appendChild(h2Tag);

      // Description and other tags.
      descriptionTag.innerText = indList["description"];
      descriptionDiv.appendChild(descriptionTag);
      // Styling description tag.
      styleDescriptionDiv(descriptionDiv);

      listingTag.innerText = indList["listing_id"];
      listingTag.hidden = true;
      priceTag.innerText = "$" + indList["price"];
      typeTag.innerText = indList["type"];
      h4Tag.appendChild(typeTag);

      // Style tags to remvove padding
      styleTags([listingTag, descriptionTag, titleTag, priceTag]);
      titleDiv.appendChild(titleBTag);

      // Injecting elements to the DOM.
      divTag.appendChild(titleDiv);

      divTag.appendChild(listingTag);
      divTag.appendChild(descriptionDiv);
      divTag.appendChild(priceTag);
      buttonSpanTag.appendChild(buttonTag);
      divTag.appendChild(buttonSpanTag);
      styleDiv(divTag);
      divTag.style["flex-grow"] = 1;
      liTag.appendChild(divTag);
      liTag.classList.add("list-group-item");
      ulResult.appendChild(liTag);
    });
  })
};


window.onload = () => {
    if (localStorage.getItem("category") !== null) {
      document.getElementById("selectDropDown").value = localStorage.getItem(
        "category"
      );
    } else {
      document.getElementById("selectDropDown").value = "All Categories";
    }
};