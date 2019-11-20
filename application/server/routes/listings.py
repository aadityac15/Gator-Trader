# Listings Route
# Holds endpoints for GET listings functionality

from flask import Blueprint, request, jsonify, send_from_directory, render_template
from model.listing import Listing

listings_blueprint = Blueprint('listings',
                               __name__,
                               static_folder='../client',
                               template_folder='../client/public/listings')


@listings_blueprint.route('/listings', methods=['GET'])
def get_listings():
    """
    Gets listings based off query and category

    @:param query: Search query
    @:param category: Search category
    :return: JSON Objects of serialized listings
    """
    query = request.args.get('query')
    category = request.args.get('category')
    search = "%{}%".format(query)

    if query and category:
        result = Listing.query.filter(Listing.title.like(search) and Listing.type == category).all()
    elif query:
        result = Listing.query.filter(Listing.title.like(search)).all()
    elif category:
        result = Listing.query.filter(Listing.type == category).all()
    else:
        result = Listing.query.all()

    return jsonify({
        'listings': [r.serialize for r in result]
    })


def create_item_success():
    """Displays success message after user successfully created an item"""
    categories = Listing.objects.all()
    return render_template("createSell_item_success.html")
