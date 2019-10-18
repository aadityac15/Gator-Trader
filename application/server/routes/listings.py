from flask import Blueprint, request, render_template
import datetime

listings_blueprint = Blueprint('listings',
                             __name__,
                             static_folder ='../client',
                             template_folder='../client/public/listings')


@listings_blueprint.route('/listings', methods=['GET'])
def get_listings():
    query = request.args.get('query')
    category = request.args.get('category')

    print(query, category)

    # TODO add jsonify functionality
    return "This is a return"

@listings_blueprint.route('/listings', metods=['POST'])
def post_listing():
    item_id = request.form.get('item_id')
    title = request.form.get('title')
    price = request.form.get('price')
    quantity = request.form.get('quantity')
    description = request.form.get('description')
    created_by = datetime.datetime.now()
    type = request.form.get('time')
    status = request.form.get('status')
    approved_by = request.form.get('approved_by')
    image = request.form.get('image')

    # TODO do shit with this shit