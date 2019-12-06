const PENDING_LISTINGS_URL = '/pending_listings'
const APPROVED_LISTINGS_URL = '/approved_listings'
const ALL_LISTINGS_URL = '/listings'

const getPendingListings = async () => {
    let pendingListings = await getListings(PENDING_LISTINGS_URL);
    console.log(pendingListings);

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

    // TODO: Inject into table
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

            listings.map(listing => createListingTableRow(listing));
        } catch (e) {
            // TODO: Create table row that says "No listings at the moment."
        }

        return listings;
    });
}


const createListingTableRow = (listing) => {
    // TODO: Creates listing table row to be injected into html
    return listing;
};
