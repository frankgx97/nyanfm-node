#coding:utf8
from flask import Flask, jsonify, request
from database import db, Song, Bg 
from playhouse.shortcuts import model_to_dict
import json
import logging


app = Flask(__name__, static_folder='static', static_url_path='')

prefix = '/api/'

config = json.loads(open('config.json').read())

@app.route('/')
def index():
    '''
    Static front page
    '''
    return app.send_static_file('index.html')

@app.route(prefix + 'get_list')
def getList():
    '''
    Return playlist
    '''
    playlist = Song.select().order_by(Song.id.desc()).dicts()
    return jsonify(list(playlist))

@app.route(prefix + 'get_bg')
def getBg():
    '''
    Return random background images
    '''
    return jsonify({})

@app.route(prefix + 'post_song', methods=['POST'])
def postSong():
    '''
    Add new song to database
    '''
    data = json.loads(request.data)
    if data['key'] != config['key']:
        logging.warn("Invalid key")
        return jsonify({'code':-99})

    song = Song(
        song_id=data['song_id'],
        title=data['title'],
        artist=data['artist'],
        album=data['album'],
        cover=data['cover'],
        mp3=data['mp3'],
        lyric=data['lyric'],
        clicks=0
        )
    try:
        if song.save() == 1:
            return jsonify({'code':0})
        else:
            return jsonify({'code':-1})
    except Exception, e:
        logging.error(e)
        return jsonify({'code':-2})

if __name__ == '__main__':
    app.run()
