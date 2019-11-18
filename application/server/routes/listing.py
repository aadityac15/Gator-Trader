from flask import Blueprint, request, jsonify
from model.listing import Listing
from model import db
import datetime

listing_blueprint = Blueprint('listing',
                              __name__,
                              static_folder ='../client',
                              template_folder='../client/public/listing')


@listing_blueprint.route('/listing', methods=['GET'])
def get_listing():
    listing_id = request.args.get('listing_id')

    result = Listing.query.get(listing_id)

    return jsonify({
        'listing': result.serialize
    })


@listing_blueprint.route('/listing', methods=['POST'])
def post_listing():
    title = request.form.get('title')
    description = request.form.get('description')
    type = request.form.get('type')
    price = request.form.get('price')
    thumbnail = request.form.get('thumbnail')
    created_on = datetime.datetime.now()
    last_edited_on = created_on
    created_by = request.form.get('created_by')

    new_listing = Listing(title=title,
                          description=description,
                          type=type,
                          price=price,
                          thumbnail=thumbnail,
                          created_on=created_on,
                          last_edited_on=last_edited_on,
                          created_by=created_by)

    db.session.add(new_listing)
    db.session.commit()

    return jsonify({
        'listing_id': new_listing.listing_id,
        'created_on': new_listing.created_on
    })


@listing_blueprint.route('/listing', methods=['PUT'])
def put_listing():
    listing_id = request.form.get('listing_id')

    listing = Listing.query.get(listing_id)
    title = request.form.get('title')
    description = request.form.get('description')
    type = request.form.get('type')
    price = request.form.get('price')
    thumbnail = request.form.get('thumbnail')

    if title:
        listing.title = title
    if description:
        listing.description = description
    if type:
        listing.type = type
    if price:
        listing.price = price
    if thumbnail:
        listing.thumbnail = thumbnail

    listing.last_edited_on = datetime.datetime.now()

    db.session.commit()

    return jsonify({
        'listing_id': listing_id,
        'last_edited_on': listing.last_edited_on
    })

