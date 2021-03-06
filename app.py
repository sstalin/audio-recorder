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
        uploads_dir = os.path.join(os.path.curdir, 'uploads')
        if not os.path.isdir(uploads_dir):
            os.mkdir(uploads_dir)
        dst = os.path.join(uploads_dir, "test_audio.ogg")
        file.save(dst)
        print(f'saved file to {dst}', file=sys.stderr)
    return jsonify(ok=True)

