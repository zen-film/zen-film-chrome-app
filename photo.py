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
    photos = get_meta(sys.argv[1])
    return json.dumps(photos)


@app.route('/magick')
def find_similar_photo():
    workdir = os.getcwd()
    path = sys.argv[1]
    os.chdir(path)

    photos = glob.glob('*.JPG')

    grouped_photo = dict()
    for photo in photos:
        current_hash = dhash(Image.open(path + photo))
        if current_hash in grouped_photo:
            grouped_photo[current_hash].append(photo)
        else:
            grouped_photo[current_hash] = [photo]

    os.chdir(workdir)
    out = [group for k, group in grouped_photo.items() if len(group) > 1]
    # return json.dumps(grouped_photo)
    return "similar photo is: %s" % str(out)


def get_meta(path):
    workdir = os.getcwd()
    os.chdir(path)

    photos = glob.glob('*.JPG')

    with exiftool.ExifTool() as et:
        raw_metadata = et.get_metadata_batch(photos)

    metadata = []
    for raw_meta in raw_metadata:
        meta = dict()
        for k, v in raw_meta.items():
            unpack_key = k.split(":")
            if len(unpack_key) == 1:
                meta[unpack_key[0]] = v
            elif unpack_key[1] in meta:
                pass
            else:
                meta[unpack_key[1]] = v
        metadata.append(meta)

    os.chdir(workdir)
    return metadata

if __name__ == "__main__":
    app.run()
