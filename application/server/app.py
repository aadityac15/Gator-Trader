from flask import Flask, render_template, send_from_directory
from routes.about_me_static import about_blueprint
from routes.static_server import static_blueprint
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='', static_folder='client')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:PASSWORD@locahost:3306/648_Database'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = '3306'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'PASSWORD_HERE'

db = SQLAlchemy(app)

app.register_blueprint(static_blueprint)
app.register_blueprint(about_blueprint)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port="5000")
