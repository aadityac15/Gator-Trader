from flask import Flask, render_template, send_from_directory

from model import db
from routes.about_me_static import about_blueprint
from routes.listing import listing_blueprint
from routes.listings import listings_blueprint
from routes.mylistings import mylistings_blueprint
from routes.user import user_blueprint
from routes.static_server import static_blueprint
# from routes.users import users_blueprint
# from routes.message import message_blueprint

app = Flask(__name__, static_url_path='', static_folder='client')

# TODO: CHANGE PASSWORD FOR YOUR LOCAL SETUP
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:waitforit@127.0.0.1:3306/test'
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = '3306'
app.config['MYSQL_USER'] = 'waitforit'
# TODO: CHANGE PASSWORD FOR YOUR LOCAL SETUP
app.config['MYSQL_PASSWORD'] = 'waitforit'

db.init_app(app)

# app.register_blueprint(message_blueprint)
# app.register_blueprint(users_blueprint)
app.register_blueprint(about_blueprint)
app.register_blueprint(listings_blueprint)
app.register_blueprint(listing_blueprint)
app.register_blueprint(mylistings_blueprint)
app.register_blueprint(user_blueprint)

app.register_blueprint(static_blueprint)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port="5000")
