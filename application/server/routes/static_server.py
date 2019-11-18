from flask import Blueprint, render_template

static_blueprint = Blueprint('static_server',
                             __name__,
                             static_folder='../client',
                             template_folder='../client/public')


@static_blueprint.route('/index', methods=['GET'])
def render_home():
    return render_template("index.html")


# @static_blueprint.route('/about', methods=['GET'])
# def render_about():
#     return render_template("/about_us.html")

@static_blueprint.route("/results", methods=["GET"])
def render_results():
    return render_template("search_result.html")


@static_blueprint.route("/terms", methods=["GET", "POST"])
def render_terms():
    return render_template("terms&conditions.html")


@static_blueprint.route("/search", endpoint="search", methods=['POST', 'GET'])
def search():
    return render_template("search_page.html")