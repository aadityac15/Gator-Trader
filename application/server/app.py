from flask import Flask, render_template, send_from_directory
from routes.about_me_static import about_blueprint
from routes.static_server import static_blueprint

app = Flask(__name__, static_url_path='',
            static_folder='client', template_folder='template')

app.register_blueprint(static_blueprint)
app.register_blueprint(about_blueprint)


@app.route("/home", endpoint="home", methods=['POST', 'GET'])
def home():
    print("Home endpoint")
    return render_template("index.html")


@app.route("/search", endpoint="search", methods=['POST', 'GET'])
def search():
    return render_template("search_page.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port="5000")
