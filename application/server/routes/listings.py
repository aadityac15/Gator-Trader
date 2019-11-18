from flask import Blueprint, request, jsonify
from model.listing import Listing
from model import db
import datetime

listings_blueprint = Blueprint('listings',
                             __name__,
                             static_folder ='../client',
                             template_folder='../client/public/listings')


@listings_blueprint.route('/listings', methods=['GET'])
def get_listings():
    query = request.args.get('query')
    category = request.args.get('category')

    if query and (category and category != 'All'):
        search = "%{}%".format(query)
        result = Listing.query.filter(Listing.title.like(search) or Listing.type == category).all()
    elif query:
        search = "%{}%".format(query)
        result = Listing.query.filter(Listing.title.like(search)).all()
    elif category and category != 'All':
        result = Listing.query.filter(Listing.type == category).all()
    else:
        result = Listing.query.all()

    return jsonify({
        'listings': [r.serialize for r in result]
    })
