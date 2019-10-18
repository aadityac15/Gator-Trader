from flask import Flask, render_template, send_from_directory
from routes.about_me_static import about_blueprint
from routes.static_server import static_blueprint
from routes.listings import listings_blueprint

app = Flask(__name__, static_url_path='', static_folder='client')

app.register_blueprint(static_blueprint)
app.register_blueprint(about_blueprint)
app.register_blueprint(listings_blueprint)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
