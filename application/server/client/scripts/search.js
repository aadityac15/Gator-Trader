/*
 * @Author: aadityac15
 * @Date: 2019-12-07 23:45:46
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-15 03:21:25
 * @Description: Fetch the listings from the backend and populate individual listing.
 */

// Press Enter to search.
document.getElementById("queryTag").addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

let count = 0;
let filterCount = 0;
let filterFlag = false;
let sort_by = "";

const sortListings = () => {
  filterFlag = true;
  filterCount += 1;
  fetchData();
};

const fetchData = async () => {
  // Transfer values from index to result.
  let category = localStorage.getItem("category");
  let noResultTag = document.getElementById("noResultTag");
  let ulResult = document.getElementById("resultList");
  if (filterFlag) {
    ulResult = await clearRows(ulResult);
    filterFlag = false;
    fetchData();
  }
  /* Get the value from the filter dropdown. */
  const filterDropDownElement = document.getElementById("filterDropDown");
  let sort_by =
    filterDropDownElement.options[filterDropDownElement.selectedIndex].value;
  ulResult.classList.add("list-group");

  // Fill the query from the query item.
  document.getElementById("queryTag").value = localStorage.getItem("query");

  // If it has id and title.
  localStorage.removeItem("id");
  localStorage.removeItem("title");

  let query = document.getElementById("queryTag").value;

  if (category === "All Categories") {
    category = "";
  }

  // handle refrersh i.e show everything if after refresh either of the parameters are null.
  if (category === null || query === null) {
    category = "";
    query = "";
  }

  const LISTINGS_URL = `listings?query=${query}&category=${category}&sort_by=${sort_by}`;

  await fetch(LISTINGS_URL, {
    method: "GET",
    withCredentials: true
  })
    .then(response => {
      if (response === undefined) {
        alert("something is wrong.");
      } else {
        return response.text();
      }
    })
    .then(data => {
      /* If the query tag contains non alphanumeric character. */
      if (JSON.parse(data).error) {
        let textNode = document.createTextNode(
          "Please try another Search query with only alphanumeric characters. Here are some other items."
        );
        noResultTag.appendChild(textNode);
        localStorage.setItem("category", "All Categories"); // set new Values.
        localStorage.setItem("query", "");
        fetchData();
      }

      let dataJson = JSON.parse(data);
      let dummyData = dataJson["listings"];

      // If the result is empty.
      if (dummyData.length === 0) {
        count += 1;

        /* if the date is empty the second time. To stop it from going in an infinite loop. */
        if (count >= 2) {
          noResultTag.innerText = "";
          let textNode = document.createTextNode(
            "No items yet. Please wait for the items to be approved if you have created a listing."
          );
          noResultTag.appendChild(textNode);
        } else {
          let textNode = document.createTextNode(
            "Your search did not match any of the items. Please try another Search query. Here are some items, or you can check out the recommended items:"
          );
          noResultTag.appendChild(textNode);
          if (category !== "") {
            localStorage.setItem("wrongCategory", category);
          } else {
            localStorage.setItem("wrongCategory", "All Categories"); // keep the current category persistent.
          }
          localStorage.setItem("category", "All Categories"); // set new Values.
          localStorage.setItem("query", "");

          fetchData();
        }
      }

      if (noResultTag.innerText === "") {
        let dataLength = dummyData.length;
        document.getElementById("displayCount").textContent = dataLength;
        document.getElementById("resultCount").textContent = dataLength;
      } else {
        // Show correct count if the response is empty.
        document.getElementById("displayCount").textContent = 0;
        document.getElementById("resultCount").textContent = 0;
      }

      //As the data would be an object
      // TO ensure the saame data isn't shown twice.
      if (ulResult.innerText === "") {
        dummyData.map(indList => {
          //  Creation of the elements.
          const titleDiv = createDomElement("div");
          const titleBTag = createDomElement("b"); // Bold Tag
          const h2Tag = createDomElement("h2"); // h2 Tag for text
          const h4Tag = createDomElement("h4"); // h4 tag for text
          const imgDivTag = createDomElement("div"); // Div tag to hold the elements.
          const buttonSpanTag = createDomElement("span"); // span tag for the buttons
          const imgTag = createDomElement("img"); // Image tag in the DOM
          imgTag.classList.add("img-fluid", "img-thumbnail");
          const typeTag = createDomElement("p");
          const descriptionTag = createDomElement("p");
          const listingTag = createDomElement("p");
          const priceTag = createDomElement("p");
          const titleTag = createDomElement("p");
          const descriptionDiv = createDomElement("div");
          const buttonTag = createDomElement("button"); // Button tag in the DOM.
          const divTag = createDomElement("div");
          let liTag = createDomElement("li");
          styleLi(liTag);

          buttonTag.innerText = "See More";
          buttonTag.style["margin-right"] = "10px";
          buttonSpanTag.style["width"] = "80%";

          // Redirect to the details page.
          buttonTag.onclick = () => {
            redirectToIndividualListing(
              indList["listing_id"],
              indList["title"]
            );
          };
          /* Styling button */
          buttonSpanTag.classList.add("flex-display-row", "make-responsive");
          buttonTag.classList.add("btn", "btn-warning");

          // Add Image / Thumbnails src if present, else show placeholder image.
          if (indList["thumbnail"] !== null) {
            imgTag.src = indList["thumbnail"];
            imgTag.width = 150;
            imgTag.height = 150;
          } else {
            imgTag.src = "https://via.placeholder.com/150";
          }

          /* Style image div */
          imgDivTag.appendChild(imgTag);
          imgDivTag.style["flex-grow"] = 1;
          imgDivTag.style["cursor"] = "pointer";

          // Redirect to details page on image click.
          imgDivTag.onclick = () => {
            redirectToIndividualListing(
              indList["listing_id"],
              indList["title"]
            );
          };

          // Title Tag and  styling
          titleTag.innerText = indList["title"];
          h2Tag.appendChild(titleTag);
          titleBTag.appendChild(h2Tag);

          // Description and other tags.
          descriptionTag.innerText = indList["description"];
          descriptionDiv.appendChild(descriptionTag);

          // Styling description tag.
          styleDescriptionDiv(descriptionDiv);

          // Description for the item.
          listingTag.innerText = indList["listing_id"];
          listingTag.hidden = true;
          priceTag.innerText = "$" + indList["price"];
          typeTag.innerText = indList["type"];
          h4Tag.appendChild(typeTag);

          // Style tags to remvove padding
          styleTags([listingTag, descriptionTag, titleTag, priceTag]);
          titleDiv.appendChild(titleBTag);

          // Appending elements to the div tag.
          divTag.appendChild(titleDiv);
          divTag.appendChild(listingTag);
          divTag.appendChild(descriptionDiv);
          divTag.appendChild(priceTag);
          buttonSpanTag.appendChild(buttonTag);
          divTag.appendChild(buttonSpanTag);
          styleDiv(divTag);

          // Injecting div tag and image div to the DOM.
          liTag.appendChild(imgDivTag);
          liTag.appendChild(divTag);
          liTag.classList.add("list-group-item");

          // Injecting each li tag to the parent ul tag.
          ulResult.appendChild(liTag);
        });
      };

      // Checking if categories are null. If null replace with empty string.
      if (localStorage.getItem("category") !== null) {
        if (localStorage.getItem("wrongCategory") !== null) {
          document.getElementById("selectDropDown").value = localStorage.getItem(
              "wrongCategory"
          );
        } else {
          document.getElementById("selectDropDown").value = localStorage.getItem(
              "category"
          );
        }
      } else {
        document.getElementById("selectDropDown").value = "All Categories";
      }

    });
};

const styleTags = element => {
  element.map(elem => {
    elem.classList.add("remove-margin");
  });
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
  divTag.style["flex-grow"] = 1;
};

// Redirects to the detail.html page showing details about the individual listing.

const redirectToIndividualListing = (id, title) => {
  localStorage.setItem("id", id);
  localStorage.setItem("title", title);
  // Open in a new window.
  window.open(`/details?item=${title}`, "_blank");
};

const styleImgTag = () => {
  imgTag.classList.add("img-fluid", "img-thumbnail");
};

const styleDescriptionDiv = descriptionDiv => {
  descriptionDiv.style["overflow"] = "auto";

  descriptionDiv.style["width"] = "100%";
  descriptionDiv.style["height"] = "25%";
};

const clearRows = ulResult => {
  if (ulResult.innerHTML !== null) {
    while (ulResult.firstChild) {
      ulResult.removeChild(ulResult.firstChild);
    }
  }
  return ulResult;
};

const fetchRecommendedListings = async () => {
  let noResultTag = document.getElementById("noResultTag");
  const ulResult = document.getElementById("resultList");
  ulResult.classList.add("list-group");
  let user_id = sessionStorage.getItem("user_id");

  await fetch(`/recommended_listings?user_id=${user_id}`, {
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
      let recommendedListingsObject = JSON.parse(data);
      let recommendedListings = recommendedListingsObject["listings"];
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
    });
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

window.onunload = () => {
  localStorage.removeItem("wrongCategory");
};
