from flask import Flask, render_template, send_from_directory

from model import db

from routes.about_me_static import about_blueprint
from flask_sqlalchemy import SQLAlchemy
from routes.listings import listings_blueprint
from routes.static_server import static_blueprint
from routes.users import users_blueprint
from routes.message import message_blueprint

app = Flask(__name__, static_url_path='', static_folder='client')

# TODO: CHANGE URI FOR YOUR LOCAL SETUP
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://patkhai:Greeks98!@127.0.0.1:3306/test'
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = '3306'
# TODO: CHANGE HOSTNAME FOR YOUR LOCAL SETUP
app.config['MYSQL_USER'] = 'patkhai'
# TODO: CHANGE PASSWORD FOR YOUR LOCAL SETUP
app.config['MYSQL_PASSWORD'] = 'Greeks98!'

db.init_app(app)

app.register_blueprint(static_blueprint)
app.register_blueprint(about_blueprint)
app.register_blueprint(listings_blueprint)
app.register_blueprint(users_blueprint)
app.register_blueprint(message_blueprint)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port="5000")