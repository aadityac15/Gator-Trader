from flask import Flask, render_template, send_from_directory
from server.routes.static_server import static_blueprint

app = Flask(__name__, static_url_path='', static_folder='static', template_folder='static/about_pages')

app.register_blueprint(static_blueprint)
