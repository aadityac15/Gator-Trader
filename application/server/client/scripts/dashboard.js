const PENDING_LISTINGS_URL = '/pending_listings?user_id=';
const APPROVED_LISTINGS_URL = '/approved_listings?user_id=';

const getPendingListings = async () => {
    console.log("GET PENDING LISTINGS FOR USER");
    let pendingListings = await getListings(PENDING_LISTINGS_URL + sessionStorage.getItem('user_id'));
    console.log(pendingListings);

    const listingTableBody = document.getElementById("remove_row")
        .getElementsByTagName('tbody')[0];
    console.log(listingTableBody);

    console.log(pendingListings);
    pendingListings.forEach(listing => listingTableBody.append(listing));
};


const getApprovedListings = async () => {
    console.log("GET APPROVED LISTINGS FOR USER");
    let approvedListings = await getListings(APPROVED_LISTINGS_URL + sessionStorage.getItem('user_id'));
    console.log(approvedListings);

    const listingTableBody = document.getElementById("remove_row")
        .getElementsByTagName('tbody')[0];
    console.log(listingTableBody);

    console.log(approvedListings);
    approvedListings.forEach(listing => listingTableBody.append(listing));
};


const getListings = async (url) => {
    console.log("Fetching: " + url);
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
            // TODO: Create table row with "No listings at the moment"
            console.log(e);
        }

        return listings;
    });
};

let createListingTableRow = (listing) => {
    console.log(listing);
    let tableRow = createDomElement("tr");
    let listingImageData = createDomElement("td");
    let listingTitleData = createDomElement("td");
    let listingDateData = createDomElement("td");

    let listingImage = createDomElement("img");
    listingImage.src = (listing.thumbnail == null) ? "https://via.placeholder.com/100" : listing.thumbnail;
    listingImage.alt = listing.title;
    listingImage.height = 100;
    listingImage.width = 100;
    listingImageData.appendChild(listingImage);

    listingTitleData.innerText = listing.title;
    listingDateData.innerText = listing.last_edited_on;

    tableRow.appendChild(listingImageData);
    tableRow.appendChild(listingTitleData);
    tableRow.appendChild(listingDateData);

    console.log(tableRow);

    return tableRow;
};
