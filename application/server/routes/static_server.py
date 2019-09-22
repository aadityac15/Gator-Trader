from flask import Blueprint, send_from_directory

static_blueprint = Blueprint('static_server', __name__)


@static_blueprint.route('/about_pages/<path:name>', methods=['GET'])
def render_about_pages(name):
    return send_from_directory('static/about_pages', 'about_{}.html'.format(name))
