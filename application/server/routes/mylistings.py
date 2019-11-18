from flask import Blueprint, request, jsonify
from model.listing import Listing
from model import db
import datetime

mylistings_blueprint = Blueprint('mylistings',
                             __name__,
                             static_folder ='../client',
                             template_folder='../client/public/mylistings')


@mylistings_blueprint.route('/mylisting', methods=['GET'])
def get_mylistings():
    user_id = request.args.get('user_id')
    result = Listing.query.filter(Listing.created_by == user_id)

    return jsonify({
        'listings': [r.serialize for r in result]
    })
