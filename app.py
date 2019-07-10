from flask import Flask, render_template, request, send_from_directory
from werkzeug.utils import secure_filename
import random
import os

hexes = '0123456789abcdef'

def get_id(len=16):
    return ''.join(random.choice(hexes) for i in range(16))

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route("/iframe_for/<game>")
def render_iframe(game):
    return render_template("iframe.html", game=game)

@app.route("/upload_wasm", methods=["POST"])
def upload_wasm():
    file = request.files['file']
    filename = secure_filename(file.filename)
    file_id = get_id()
    file.save(os.path.join("wasms", file_id))
    return file_id


@app.route("/games/<filename>")
def download_game(filename):
    return send_from_directory("games", filename)


@app.route("/src/<filename>")
def download_js(filename):
    return send_from_directory("src", filename)


app.run(host="0.0.0.0", port=5000, debug=True)
