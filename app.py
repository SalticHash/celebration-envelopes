# Imports from files
from encode import encode, decode, dumps
from lang import LANG
from config import CONFIG
from qrimg import generate_qr_image

# builtins
from re import match

# Flask Imports
from flask import Flask, redirect, render_template, request, url_for

# Configure application
app = Flask(__name__)


# Routes
@app.route("/", methods=["GET"])
def index():
    return render_template("indexx.html")



if __name__ == "__main__":
    app.run(debug = True,port=2727)