from flask import Flask, render_template, request, send_from_directory, send_file, render_template_string
from flask_cors import CORS, cross_origin
import random
import requests
import os

app = Flask(__name__, static_folder="build/static")

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def main():
    try:
        return send_file("build/index.html")
    except FileNotFoundError:
        return "Unable to find index.html. This probably means that the website hasn't built yet.", 500


@app.route("/iframe_for/<game>")
@cross_origin()
def render_iframe(game):
    env = request.args.get("environment", "dwitter")
    supported = {'dwitter', 'es6', 'plain', 'jsfiddle', 'offscreen_canvas'}
    if env in supported:
        return render_template(f"{env}_iframe.html", game=game)
    else:
        raise ValueError(f"Unable to find environment {env}.")

@app.route("/sample_games/<filename>")
@cross_origin()
def download_game(filename):
    return send_from_directory("sample_games", filename)

@app.route("/manifest.json")
def download_manifest():
    return send_file("build/manifest.json")

@app.route("/js_environments/<file>")
@cross_origin()
def send_iframe_environment(file):
    return send_from_directory("build/js_environments", file)

@app.route("/assets/<file>")
def send_asset(file):
    return send_from_directory("build/assets", file)

@app.route("/cleanup_iframe.js")
def send_cleanup() :
    return send_file("build/cleanup_iframe.js")

@app.route("/favicon.ico")
def send_favicon():
    return send_file("build/favicon.ico")

def get_code_for_dweet(id):
	r = requests.get(f"https://dweet.dwitter.net/id/{id}")
	lines = r.text.split("\n")
	code_begin = lines.index('    function u(t) {')
	code_length = lines[code_begin:].index('    }')
	code = "\n".join(lines[code_begin+1:code_begin+code_length])
	return code

@app.route("/offscreen_for/<int:dweet_id>.js")
def steal_dweet(dweet_id):
    code = get_code_for_dweet(dweet_id)
    with open("build/js_environments/dwitter_stealer.js", 'r') as file:
        return render_template_string(file.read(), stolen_dwitter_code=code)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

