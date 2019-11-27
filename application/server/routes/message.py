from flask import Blueprint, request, jsonify
import datetime
import distutils

from model.message import Message
from model import db


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


@message_blueprint.route('/send_message', methods=['POST'])
def send_message():
    """
    Sends message to user

    :param sent_by
    :param sent_to
    :param message_body
    :param from_admin
    :return:
    """
    sent_by = request.form.get('sent_by')
    sent_to = request.form.get('sent_to')
    message_body = request.form.get('message_body')
    from_admin = True if request.form.get('from_admin') == 'True' else False

    new_message = Message(
        sent_by=sent_by,
        sent_to=sent_to,
        message_body=message_body,
        from_admin=from_admin,
        timestamp=datetime.datetime.now(),
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({
        'message_id': new_message.message_id,
        'timestamp': new_message.timestamp
    })


@message_blueprint.route('/message', methods=['GET'])
def get_message():
    """
    Get message by message_id

    :param message_id
    :return:
    """
    message_id = request.args.get('message_id')

    message = Message.query.get(message_id)
    if not message:
        return jsonify({
            'error': 'No message found'
        })

    return jsonify({
        'message': message.serialize
    })

