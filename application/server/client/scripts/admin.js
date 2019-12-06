const PENDING_LISTINGS_URL = '/pending_listings'
const APPROVED_LISTINGS_URL = '/approved_listings'
const ALL_LISTINGS_URL = '/listings'

const getPendingListings = async () => {
    let pendingListings = await getListings(PENDING_LISTINGS_URL);
    console.log(pendingListings);

    const listingTableBody = document.getElementById("pending-listings-table")
        .getElementsByTagName('tbody')[0];
    console.log(listingTableBody);
    // TODO: Inject into table
};


const getApprovedListings = async () => {
    let approvedListings = await getListings(APPROVED_LISTINGS_URL);
    console.log(approvedListings);

    // TODO: Inject into table
};


const getAllListings = async () => {
    let allListings = await getListings(ALL_LISTINGS_URL);
    console.log(allListings);

    const listingTableBody = document.getElementById("all-listings-table")
        .getElementsByTagName('tbody')[0];
    console.log(listingTableBody);

    allListings.forEach(listing => listingTableBody.append(listing));
};

const getListings = async (url) => {
    return fetch(url, {
        method: "GET",
        withCredentials: true
    }).then(response => {
        if (response === undefined);
        else {
            return response.text();
        }
    }).then(data => {
        let listings = [];

        try {
            let listingsObject = JSON.parse(data);
            listings = listingsObject['listings'];
            if (listings.length == 0) {
                // TODO: Create table row that says "No listings at the moment."
            }

            listings = listings.map((listing) => createListingTableRow(listing));

            return listings;
        } catch (e) {
            // TODO: Create table row that says "No listings at the moment."
            console.log(e);
        }

    });
}


let createListingTableRow = (listing) => {
    let tableRow = createDomElement("tr");
    let listingImageData = createDomElement("td");
    let listingTitleData = createDomElement("td");
    let listingDescriptionData = createDomElement("td");
    let listingApprovalData = createDomElement("td");

    let listingImage = createDomElement("img");
    listingImage.src = (listing.thumbnail == null) ? "https://via.placeholder.com/100" : listing.thumbnail;
    listingImage.alt = listing.title;
    listingImage.height = 100;
    listingImage.width = 100;
    listingImageData.appendChild(listingImage);

    listingTitleData.innerText = listing.title;
    listingDescriptionData.innerText = listing.description;

    let approveButton = createDomElement("button");
    approveButton.id = "approveButton";
    approveButton.innerText = "Approve";
    let denyButton = createDomElement("button");
    denyButton.id = "denyButton";
    denyButton.innerText = "Deny";
    listingApprovalData.appendChild(approveButton);
    listingApprovalData.appendChild(denyButton);

    tableRow.appendChild(listingImageData);
    tableRow.appendChild(listingTitleData);
    tableRow.appendChild(listingDescriptionData);
    tableRow.appendChild(listingApprovalData);

    console.log(tableRow);

    return tableRow;
};
