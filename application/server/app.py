from flask import Flask, render_template, send_from_directory
from server.routes.about_me_static import about_blueprint
from server.routes.static_server import static_blueprint

app = Flask(__name__, static_url_path='', static_folder='client')

app.register_blueprint(static_blueprint)
app.register_blueprint(about_blueprint)
