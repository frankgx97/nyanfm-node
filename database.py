#coding:utf8
from peewee import *
import datetime

db = SqliteDatabase('database.db')

class BaseModel(Model):
    class Meta:
        database = db

class Song(BaseModel):
    id = IntegerField(primary_key=True)
    song_id = IntegerField(unique=True)
    title = CharField()
    artist = CharField()
    album = CharField()
    cover = CharField()
    mp3 = CharField()
    lyric = TextField()
    clicks = IntegerField()
    update_at = DateTimeField(default=datetime.datetime.now)

class Bg(BaseModel):
    id = IntegerField(primary_key=True)
    url = CharField()
    update_at = DateTimeField(default=datetime.datetime.now)