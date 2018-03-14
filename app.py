#coding:utf8
from flask import Flask, jsonify
from database import db, Song, Bg 


app = Flask(__name__)

prefix = '/api'

@app.route('/')
def index():
    '''
    Static front page
    '''
    return app.send_static_file('/static/index.html')

@app.route(prefix + 'get_list')
def getList():
    '''
    Return playlist
    '''
    playlist = Song.select().get()
    return jsonify(playlist)

@app.route(prefix + 'get_bg')
def getBg():
    '''
    Return random background images
    '''
    return jsonify({})

@app.route(prefix + 'post_song')
def postSong(content):
    '''
    Add new song to database
    '''
    return jsonify({})

if __name__ == '__main__':
    app.run()
