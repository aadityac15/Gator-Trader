from flask import Blueprint, request, jsonify, send_from_directory, render_template
from model.listing import Listing
from model import db
import datetime

listings_blueprint = Blueprint('listings',
                               __name__,
                               static_folder='../client',
                               template_folder='../client/public/listings')


@listings_blueprint.route('/listings', methods=['GET'])
def get_listings():
    query = request.args.get('query')
    category = request.args.get('category')

    result = ""

    if query and (category and category != 'All'):
        result = Listing.query.filter(Listing.title == query or Listing.type == category)
        print(1)
        print(result)
    elif query:
        result = Listing.query.filter(Listing.title == query)
        print(2)
        print(result)
    elif category and category != 'All':
        result = Listing.query.filter(Listing.type == category)
        print('category = ', category)
        print(result)
    else:
        result = Listing.query.all()
        print(4)
        print(result)

    # TODO figure out how to properly return
    # print([r.serialize() for r in result])
    return jsonify({
        'listings': [r.serialize for r in result]
    })


@listings_blueprint.route('/listings', methods=['POST'])
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

    return


    # TODO do shit with this shit


@listings_blueprint.route('/listings/<path:name>', methods=["GET"])
def render_listings(name):
    return render_template('/{}.html'.format(name))
