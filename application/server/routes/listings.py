from flask import Blueprint, request, render_template, jsonify, Response
from model import listing, location, message, user
from app import db
import datetime

listings_blueprint = Blueprint('listings',
                             __name__,
                             static_folder ='../client',
                             template_folder='../client/public/listings')


@listings_blueprint.route('/listings', methods=['GET'])
def get_listings():
    query = request.args.get('query')
    category = request.args.get('category')
    if query and category:
        result = listing.query.filter(listing.title == query or listing.type == category)
        if result:
            return result

    elif query:
        result = listing.query.filter(listing.title == query)
        if result:
            return result
    elif category:
        result = listing.query.filter(listing.type == category)
        if result:
            return result
    else:
        result = listing.query.all()
        if result:
            return result

    # TODO figure out how to properly return


@listings_blueprint.route('/listings', metods=['POST'])
def post_listing():
    listing_id = request.form.get('listing_id')
    title = request.form.get('title')
    description = request.form.get('description')
    type = request.form.get('type')
    price = request.form.get('price')
    thumbnail = request.form.get('thumbnail')
    created_on = datetime.datetime.now()
    last_edited_on = request.form.get('last_edited_on')
    created_by = request.form.get('created_by')

    new_listing = listing(listing_id=listing_id,
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

    return

    # TODO do shit with this shit
