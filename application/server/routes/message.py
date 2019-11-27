from flask import Blueprint, request, jsonify

from model.message import Message


message_blueprint = Blueprint('message_server',
                              __name__,
                              static_folder='../client',
                              template_folder='../client/public/message')


@message_blueprint.route('/my_messages', methods=['GET'])
def get_my_messages():
    """
    Gets all messages sent to a user

    :param user_id
    :return:
    """
    user_id = request.args.get('user_id')

    messages = Message.query.filter_by(sent_to=user_id)
    return jsonify({
        'messages': [message.serialize for message in messages]
    })
