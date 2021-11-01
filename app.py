import os, sys
from flask import Flask
from flask import render_template
from flask import request, jsonify, abort
from mimetypes import guess_extension
from werkzeug.utils import secure_filename


app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/upload', methods=["POST"])
def upload():
    if "audio_file" in request.files:
        file = request.files['audio_file']
        print(file, file=sys.stderr)
        dst = os.path.join(os.path.curdir, 'uploads', "test_audio.ogg")
        file.save(dst)
    return jsonify(ok=True)

