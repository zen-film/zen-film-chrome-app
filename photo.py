from flask import Flask, render_template, request, send_from_directory
import sys
import glob
import os
import json
import exiftool
from PIL import Image
from image_hash import image_hash
et = exiftool.ExifTool()
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


@app.route('/gear')
def get_gear():
    return send_from_directory('', 'gear.json')


@app.route('/magick')
def find_similar_photo():
    workdir = os.getcwd()
    path = sys.argv[1]
    os.chdir(path)

    photos = glob.glob('*.JPG')

    grouped_photo = dict()
    for photo in photos:
        # 5 - подобранно опытным путем
        current_hash = image_hash(Image.open(path + photo), 5)
        if current_hash in grouped_photo:
            grouped_photo[current_hash].append(photo)
        else:
            grouped_photo[current_hash] = [photo]

    os.chdir(workdir)
    out = [group for k, group in grouped_photo.items() if len(group) > 1]
    # return json.dumps(grouped_photo)
    return "similar photo is: %s" % str(out)


@app.route('/update', methods=['POST'])
def update_handler():
    request_data = json.dumps(request.json)
    data = json.loads(request_data)

    for file, params in data.items():
        set_meta(sys.argv[1], file, params)
    return '200'


def set_meta(path, filename, prop):
    with et:
        et.set_tags(prop, '%s/%s' % (path, filename))


def get_meta(path):
    workdir = os.getcwd()
    os.chdir(path)

    photos = glob.glob('*.JPG')

    with et:
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
