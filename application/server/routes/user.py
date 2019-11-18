from flask import Blueprint, request, jsonify, abort
from werkzeug.security import generate_password_hash, check_password_hash

from model.user import User
from model import db

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/verify', methods=['POST'])
def verify():
    user_id = request.form.get('user_id')
    token = request.form.get('token')

    user = User.query.filter_by(user_id=user_id)
    if user.token == token:
        return jsonify(success=True)
    return jsonify(success=False)


@user_blueprint.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    user = User.query.filter_by(username=username).first()
    if check_password_hash(user.password, password):
        return jsonify(success=True)
    abort(403, 'Username and password do not match.')


@user_blueprint.route('/create', methods=['POST'])
def create():
    email = request.form.get('email')
    username = request.form.get('username')
    password = request.form.get('password')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    major = request.form.get('major') if 'major' in request.form else None

    new_user = User(
        email=email,
        username=username,
        password=generate_password_hash(password),
        first_name=first_name,
        last_name=last_name,
        major=major,
        is_admin=None
    )

    db.session.add(new_user)
    db.session.commit()

    # TODO: Return token

    return jsonify(success=True)
