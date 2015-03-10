from flask import Flask, render_template
from flask import request, send_from_directory, make_response

import os
import sys
import glob

import json
import exiftool

from similar_photo import get_similar_photos

et = exiftool.ExifTool()

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/photo/<filename>')
def photos_static(filename):
    '''
    Отдаем фотографию по запросу
    '''
    return send_from_directory(sys.argv[1], filename)


@app.route('/vendor/<path:filename>')
def vendor_static(filename):
    '''
    Локально расположенные стороние библиотеки
    '''
    return send_from_directory('libs', filename)


@app.route('/gear')
def get_gear():
    '''
    Отправляем информацию о оборудование
    TODO: Подумать быть может лучше убрать в static
    '''
    return send_from_directory('', 'gear.json')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/photos')
def exif_to_json():
    '''
    Отдаем страничку
    '''
    photos = get_meta(sys.argv[1])
    return json.dumps(photos)


@app.route('/update', methods=['POST'])
def json_to_exif():
    request_data = json.dumps(request.json)
    data = json.loads(request_data)

    for file, params in data.items():
        set_meta(sys.argv[1], file, params)
    return '200'


@app.route('/magick')
def find_similar_photos():
    out = get_similar_photos(sys.argv[1], 5)
    return json.dumps(out)


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
    try:
        if os.path.isdir(sys.argv[1]):
            app.run(debug=True)
        else:
            exit('{} is not directory'.format(sys.argv[1]))
    except IndexError:
        exit('Add path to folder')
