const PENDING_LISTINGS_URL = '/pending_listings'
const APPROVED_LISTINGS_URL = '/approved_listings'
const ALL_LISTINGS_URL = '/listings'

const getPendingListings = async () => {
    let pendingListings = getListings(PENDING_LISTINGS_URL);
    // TODO: Inject into table
};


const getApprovedListings = async () => {
    let approvedListings = getListings(APPROVED_LISTINGS_URL);
    // TODO: Inject into table
};


const getAllListings = async () => {
    let allListings = getListings(ALL_LISTINGS_URL);
    // TODO: Inject into table
};

const getListings = async (url) => {
    await fetch(url, {
        method: "GET",
        withCredentials: true
    }).then(response => {
        if (response === undefined);
        else {
            return response.text;
        }
    }).then(data => {
        let listings = [];

        try {
            let listingsObject = JSON.parse(data);
            let listings = listingsObject['listings'];
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
};
