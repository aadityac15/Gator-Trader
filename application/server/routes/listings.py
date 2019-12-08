# Listings Route
# Holds endpoints for GET listings functionality

from flask import Blueprint, request, jsonify, send_from_directory, render_template
import datetime
# import os

from model.listing import Listing
from model import db

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
        result = Listing.query.filter(Listing.title.like(search), Listing.type == category).all()
    elif query:
        result = Listing.query.filter(Listing.title.like(search)).all()
    elif category:
        result = Listing.query.filter(Listing.type == category).all()
    else:
        result = Listing.query.all()

    return jsonify({
        'listings': [r.serialize for r in result]
    })


@listings_blueprint.route('/pending_listings', methods=['GET'])
def get_pending_listings():
    """
    Gets pending listings for a user

    :param user_id
    :return:
    """
    user_id = request.args.get('user_id')
    pending_listings = []

    if user_id:
        pending_listings = Listing.query.filter_by(approved=None, created_by=user_id)
    else:
        pending_listings = Listing.query.filter_by(approved=None)

    return jsonify({
        "listings": [listing.serialize for listing in pending_listings]
    })


@listings_blueprint.route('/approved_listings', methods=['GET'])
def get_approved_listings():
    """
    Gets pending listings for a user

    :param user_id
    :return:
    """
    user_id = request.args.get('user_id')
    approved_listings = []

    if user_id:
        approved_listings = Listing.query.filter_by(approved=True, created_by=user_id)
    else:
        approved_listings = Listing.query.filter_by(approved=True)

    return jsonify({
        "listings": [listing.serialize for listing in approved_listings]
    })

@listings_blueprint.route('/denied_listings', methods=['GET'])
def get_denied_listings():
    """
    Gets pending listings for a user

    :param user_id
    :return:
    """
    denied_listings = Listing.query.filter_by(approved=False)

    return jsonify({
        "listings": [listing.serialize for listing in denied_listings]
    })


@listings_blueprint.route('/listings', methods=['POST'])
def post_listing():
    if request.method == 'POST':
        listing_id = request.form.get('listing_id')
        title = request.form.get('title')
        description = request.form.get('description')
        type = request.form.get('type')
        price = request.form.get('price')
        thumbnail = request.form.get('thumbnail')
        created_on = datetime.datetime.now()
        last_edited_on = request.form.get('last_edited_on')
        created_by = request.form.get('created_by')

        new_listing = Listing(listing_id=listing_id,
                              title=title,
                              description=description,
                              type=type,
                              price=price,
                              thumbnail=thumbnail,
                              created_on=created_on,
                              last_edited_on=last_edited_on,
                              created_by=created_by)

        db.session.add(new_listing)
        db.session.commit()
    return jsonify(success=True)


def create_item_success():
    """Displays success message after user successfully created an item"""
    categories = Listing.objects.all()
    return render_template("createSell_item_success.html")



@listings_blueprint.route('/categories', methods=['GET'])
def get_categories():
    with open("./routes/categories.txt") as file:
        categories_string = file.read()
        print(categories_string)
        categories = categories_string.split(',')
        return jsonify({
            'categories': categories
        })
