from flask import Flask, render_template
from flask import request, send_from_directory, make_response

import os
import sys
import glob

import json
import exiftool

import vk_auth
import json
import urllib.request as urllib
from urllib.parse import urlencode
# import os
import getpass
# import sys

from similar_photo import get_similar_photos
token = None
def call_api(method, params, token):
    params.append(("access_token", token))
    url = "https://api.vk.com/method/{}?{}".format(method, urlencode(params))
    res = urllib.urlopen(url).read().decode('utf-8')
    return json.loads(str(res))["response"]

def get_albums(user_id, token):
    return call_api("photos.getAlbums", [("uid", user_id)], token)

def get_photos_urls(user_id, album_id, token):
    photos_list = call_api("photos.get", [("uid", user_id), ("aid", album_id)], token)
    result = {}
    for photo in photos_list:
        if "src_xxbig" in photo:
            url = photo["src_xxbig"]
        elif "src_xbig" in photo:
            url = photo["src_xbig"]
        elif "src_big" in photo:
            url = photo["src_big"]
        else:
            url = photo["src"]
        result.update({url: photo['pid']})
    return result
# et = exiftool.ExifTool()

def get_urls():
    # email = input("Login: ")
    email = "+79226018274"
    # password = getpass.getpass()
    password = "gook0hvov"
    client_id = "4906664"
    token, user_id = vk_auth.auth(email, password, client_id, "photos")
    albums = get_albums(user_id, token)
    print("\n".join("{}. {}".format(num, album["title"]) for num, album in enumerate(albums)))
    choice = -1
    while choice not in range(len(albums)):
        choice = int(input("Choose album number: "))
    return get_photos_urls(user_id, albums[choice]["aid"], token)

photos_urls = get_urls()
app = Flask(__name__)
app.config.from_object(__name__)




@app.route('/vendor/<path:filename>')
def vendor_static(filename):
    '''
    Return vendor libs
    '''
    return send_from_directory('libs', filename)


@app.route('/gear')
def get_gear():
    '''
    Return gear infourl
    '''
    return send_from_directory('', 'gear.json')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/photos')
def exif_to_json():
    '''
    Return page
    '''
    photos = []
    for url in photos_urls:
        photos.append({'SourceFile': url})
    return json.dumps(photos)


@app.route('/delete', methods=['POST'])
def delete_photo():
    request_data = json.dumps(request.json)
    data = json.loads(request_data)
    for url in data:
        print('>>>>>>', photos_urls[url])

    return '200'


@app.route('/similar')
def find_similar_photos():
    out = get_similar_photos(photos_urls, 5)
    return json.dumps(out)


if __name__ == "__main__":
    app.run(debug=True)
