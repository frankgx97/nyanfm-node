var sql_connect = require('../conf.js');
module.exports = {
    schema: {
        id: { type: 'serial', key: true },
        title: String,
        artist: String,
        album: String,
        cover: String,
        mp3: String,
        ogg: String,
        lyric: String
    }
}