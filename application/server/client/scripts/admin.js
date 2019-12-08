const PENDING_LISTINGS_URL = '/pending_listings';
const APPROVED_LISTINGS_URL = '/approved_listings';
const DENIED_LISTINGS_URL = '/denied_listings';
const ALL_LISTINGS_URL = '/listings';
const EDIT_LISTING_APPROVAL_URL = '/edit_listing_approval';

const getPendingListings = async () => {
    let pendingListings = await getListings(PENDING_LISTINGS_URL);
    console.log(pendingListings);

    const listingTableBody = document.getElementById("pending-listings-table")
        .getElementsByTagName('tbody')[0];
    console.log(listingTableBody);

    console.log(pendingListings);
    pendingListings.forEach(listing => listingTableBody.append(listing));
};


const getApprovedListings = async () => {
    let approvedListings = await getListings(APPROVED_LISTINGS_URL);
    console.log(approvedListings);

    const listingTableBody = document.getElementById("approved-listings-table")
        .getElementsByTagName('tbody')[0];
    console.log(listingTableBody);

    console.log(approvedListings);
    approvedListings.forEach(listing => listingTableBody.append(listing));
};


const getDeniedListings = async () => {
    let deniedListings = await getListings(DENIED_LISTINGS_URL);
    console.log(deniedListings);

    const listingTableBody = document.getElementById("denied-listings-table")
        .getElementsByTagName('tbody')[0];
    console.log(listingTableBody);

    console.log(deniedListings);
    deniedListings.forEach(listing => listingTableBody.append(listing));
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
            // TODO: Create table row with "No listings at the moment"
            console.log(e);
        }

        return listings;
    });
};

let editListingApprovalStatus = (listing_id, approval_status) => {
    let response = fetch(EDIT_LISTING_APPROVAL_URL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ listing_id, approval_status, }),
        credentials: 'same-origin'
    }).then(res => {console.log(res)});
};


let createListingTableRow = (listing) => {
    let tableRow = createDomElement("tr");
    let listingImageData = createDomElement("td");
    let listingTitleData = createDomElement("td");
    let listingDescriptionData = createDomElement("td");
    let listingCreatorData = createDomElement("td");
    let listingApprovalData = createDomElement("td");

    let listingImage = createDomElement("img");
    listingImage.src = (listing.thumbnail == null) ? "https://via.placeholder.com/100" : listing.thumbnail;
    listingImage.alt = listing.title;
    listingImage.height = 100;
    listingImage.width = 100;
    listingImageData.appendChild(listingImage);

    listingTitleData.innerText = listing.title;
    listingDescriptionData.innerText = listing.description;


    if (listing.approved == false || listing.approved == null) {
        let approveButton = createDomElement("button");
        approveButton.id = "approveButton";
        approveButton.className = "approveButton remove";
        approveButton.innerText = "Approve";
        approveButton.onclick = () => {
            editListingApprovalStatus(listing.listing_id, true)
        };

        listingApprovalData.appendChild(approveButton);
    }

    if (listing.approved == true || listing.approved == null) {
        let denyButton = createDomElement("button");
        denyButton.id = "denyButton";
        denyButton.className = "denyButton remove";
        denyButton.innerText = "Deny";
        denyButton.onclick = () => {
            editListingApprovalStatus(listing.listing_id, false)
        };

        listingApprovalData.appendChild(denyButton);
    }

    tableRow.appendChild(listingImageData);
    tableRow.appendChild(listingTitleData);
    tableRow.appendChild(listingDescriptionData);
    tableRow.appendChild(listingCreatorData);
    tableRow.appendChild(listingApprovalData);

    console.log(tableRow);

    return tableRow;
};
