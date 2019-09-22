from flask import Blueprint, render_template

static_blueprint = Blueprint('static_server',
                             __name__,
                             static_folder='../client',
                             template_folder='../client/public')


@static_blueprint.route('/', methods=['GET'])
def render_home():
    return render_template('index.html')

@static_blueprint.route('/about', methods=['GET'])
def render_about():
    return render_template('about_us.html')
