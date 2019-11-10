from flask import Flask, render_template, send_from_directory

from routes.about_me_static import about_blueprint
from routes.static_server import static_blueprint
from flask_sqlalchemy import SQLAlchemy
from routes.listings import listings_blueprint
from routes.static_server import static_blueprint
from model import db

app = Flask(__name__, static_url_path='', static_folder='client')

# TODO: CHANGE PASSWORD FOR YOUR LOCAL SETUP
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:csc648-password@127.0.0.1:3306/648_database'
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = '3306'
app.config['MYSQL_USER'] = 'root'
# TODO: CHANGE PASSWORD FOR YOUR LOCAL SETUP
app.config['MYSQL_PASSWORD'] = 'csc648-password'


db.init_app(app)

app.register_blueprint(static_blueprint)
app.register_blueprint(about_blueprint)
app.register_blueprint(listings_blueprint)



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port="5001")
