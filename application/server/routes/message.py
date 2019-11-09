from flask import Blueprint, send_from_directory, render_template

message_blueprint = Blueprint('message_server',
                              __name__,
                              static_folder='../client',
                              template_folder='../client/public/message')


@message_blueprint.route('/message/<path:name>', methods=["GET", "POST"])
def render_users(name):
    return render_template('/{}.html'.format(name))
