from flask import Blueprint, send_from_directory, render_template

about_blueprint = Blueprint('about_server',
                             __name__,
                             static_folder='../client',
                             template_folder='../client/public/about_pages')


@about_blueprint.route('/about_pages/<path:name>', methods=['GET'])
def render_about_pages(name):
    return render_template('{}.html'.format(name))
