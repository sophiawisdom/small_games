from flask import Flask, render_template, request, send_from_directory, send_file
import random
import os

hexes = '0123456789abcdef'

def get_id(len=16):
    return ''.join(random.choice(hexes) for i in range(16))

app = Flask(__name__, static_folder="build/static")

@app.route('/')
def main():
    return send_file("build/index.html")


@app.route("/iframe_for/<game>")
def render_iframe(game):
    return render_template("iframe.html", game=game)


@app.route("/sample_games/<filename>")
def download_game(filename):
    return send_from_directory("sample_games", filename)

@app.route("/manifest.json")
def download_manifest():
    return send_file("build/manifest.json")

@app.route("/iframe_environment.js")
def send_iframe_environment() :
    return send_file("build/iframe_environment.js")

@app.route("/cleanup_iframe.js")
def send_cleanup() :
    return send_file("build/cleanup_iframe.js")

@app.route("/favicon.ico")
def send_favicon():
    return send_file("build/favicon.ico")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

