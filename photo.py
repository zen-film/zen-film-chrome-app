from flask import Flask, render_template, url_for, send_from_directory, jsonify
import sys
import glob
import os
import json
import exiftool
from PIL import Image

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
def show_photo_grid():
    photos = get_photos(sys.argv[1])
    return render_template('index.html', image=photos)


@app.route('/photos')
def json_photo():
    photos = get_photos(sys.argv[1])
    return json.dumps(photos)


def get_photos(path):
    workdir = os.getcwd()
    os.chdir(path)

    photos = glob.glob('*.JPG')
    print(dhash(orig) == dhash(modif))
    with exiftool.ExifTool() as et:
        metadata = et.get_metadata_batch(photos)

    os.chdir(workdir)
    return metadata


def dhash(image, hash_size=8):
    image = image.convert('L').resize(
        (hash_size + 1, hash_size),
        Image.ANTIALIAS,
    )

    pixels = list(image.getdata())

    difference = []
    for row in xrange(hash_size):
        for col in xrange(hash_size):
            pixel_left = image.getpixel((col, row))
            pixel_right = image.getpixel((col + 1, row))
            difference.append(pixel_left > pixel_right)

    decimal_value = 0
    hex_string = []
    for index, value in enumerate(difference):
        if value:
            decimal_value += 2**(index % 8)
        if (index % 8) == 7:
            hex_string.append(hex(decimal_value)[2:].rjust(2, '0'))
            decimal_value = 0

    return ''.join(hex_string)

if __name__ == "__main__":
    app.run()
