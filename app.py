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

app.jinja_env.globals.update(lang = LANG)

# Routes
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        greeting = request.form.get("greeting")
        name = request.form.get("name")
        message = request.form.get("message")
        songURL = request.form.get("songURL")
        confStyle = request.form.get("confStyle")
        confType = request.form.get("confType")
        confColors = request.form.getlist("color")

        # Test for latin and numeric characters, underscores and spaces with lenght 1-50 characters long.
        if not match(r'^[\w À-ÿ][^×÷]{1,25}$', greeting):
            return error("Invalid name format")

        # Test for latin and numeric characters, underscores and spaces with lenght 1-50 characters long.
        if not match(r'^[\w À-ÿ][^×÷]{1,50}$', name):
            return error("Invalid name format")

        # Test for latin and numeric characters, underscores and spaces with lenght 1-50 characters long.
        if not match(r'^[\w\sÀ-ÿ][^×÷]{1,250}$', message):
            return error("Invalid message format")

        # Test for URLs.
        if not match(r'^(http|https):\/\/[^ "]+$', songURL) and songURL:
            return error("Invalid url format")

        # Test for number
        if not match(r'^\d+$', confStyle):
            return error("Confetti style is not a number")
        # Test if bigger than 5
        if int(confStyle) > 5:
            return error("Confetti style unavailable")

        # Test for number
        if not match(r'^\d+$', confType):
            return error("Confetti type is not a number")
        # Test if bigger than 5
        if int(confType) > 5:
            return error("Confetti type unavailable")

        # Test all colors
        for color in confColors:
            # Test for hex color
            if not match(r'^#[\da-f]{6}$', color):
                return error("Color not valid")

        req = {
            "greeting": greeting,
            "name": name,
            "message": message,
            "songURL": songURL,
            "confStyle": confStyle,
            "confType": confType,
            "confColors": dumps(confColors)
        }

        req_encoded = encode(req)

        if "create" in request.form:
            return redirect(url_for("view", q=req_encoded))
        elif "generate_qr" in request.form:
            return redirect(url_for("generateQR_Route", q=req_encoded))
    else:
        return render_template("index.html")

@app.route("/view")
def view():
    req_encoded = request.args.get("q")
    req = decode(req_encoded)
    return render_template("view.html", req = req)

@app.route("/songs")
def songs():
    return render_template("songs.html", songs = CONFIG.get("songs"))

@app.route('/manual')
def manual():
    return render_template("manual.html")

@app.errorhandler(404)
def page_not_found(_event):
    return error("Page not found, It's nowhere to be seen", 404)


# Generate a image: set q to encoded and get link of view
@app.route('/QRUrl')
def generateQRUrl():
    data = request.args.get("q")
    url = f"https://celebration-envelopes.vercel.app/view?q={data}"
    return generate_qr_image(url)

# Get q and pass it to img to get the qr
@app.route('/generateQR')
def generateQR_Route():
    data = request.args.get("q")
    return render_template("generateQR.html", req = data)


def error(text, statuscode = 400):
    req = {"text": text, "statuscode": statuscode}
    return render_template("error.html", req=req)

if __name__ == "__main__":
    app.run(port=2727)
