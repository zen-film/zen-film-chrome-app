from flask import Flask, render_template, url_for, send_from_directory
import sys
import glob
import os
import json
import exiftool
from PIL import Image
from dhash import dhash

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/photo/<filename>')
def photo_static(filename):
    return send_from_directory(sys.argv[1], filename)


@app.route('/vendor/<path:filename>')
def vendor_static(filename):
    return send_from_directory('bower_components', filename)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/photos')
def json_photo():
    photos = get_photos(sys.argv[1])
    return json.dumps(photos)


@app.route('/magick')
def find_similar_photo():
    workdir = os.getcwd()
    path = sys.argv[1]
    os.chdir(path)

    photos = glob.glob('*.JPG')

    grouped_photo = {}
    for i in range(len(photos)):
        current_hash = dhash(Image.open(path + photos[i]))
        if current_hash in grouped_photo:
            grouped_photo[current_hash].append(photos[i])
        else:
            grouped_photo.update({current_hash: [photos[i]]})

    print(grouped_photo)

    os.chdir(workdir)
    return "hello"


def get_simmilar(hashdict, dhash):
    out = []
    for k, v in hashdict.keys:
        if v == dhash:
            out.append(k)
    return out


def get_photos(path):
    workdir = os.getcwd()
    os.chdir(path)

    photos = glob.glob('*.JPG')

    with exiftool.ExifTool() as et:
        metadata = et.get_metadata_batch(photos)

    os.chdir(workdir)
    return metadata

if __name__ == "__main__":
    app.run()
