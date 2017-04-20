var orm = require('orm');
var request = require('request');
var fs = require('fs');

var conf = require('./conf.js');
var db_model = require('./models/song.js');

var header = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3070.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'DNT': 1,
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6'
}

orm.connect(conf.sql, function(err, db) {
    var Song = db.define('song', db_model.schema);

    request.get(
        'http://localhost:3000/playlist/detail?id=' + conf.list_id,
        function(error, response, body) {
            if (error) throw error;
            if (!error && response.statusCode == 200) {
                JSON.parse(body).playlist.tracks.forEach(function(element) {
                    request.get(
                        'http://localhost:3000/music/url?id=' + element.id,
                        function(e, r, b) {
                            if (e) throw e;
                            if (!e && response.statusCode == 200) {
                                db.sync(function(err) {
                                    if (err) throw err;
                                    console.log(element.name);
                                    console.log(JSON.parse(b).data[0].url);
                                    //下载mp3文件并保存为 歌曲id.mp3
                                    request({
                                        url: JSON.parse(b).data[0].url,
                                        headers: header
                                    }).pipe(fs.createWriteStream("mp3/" + element.id + ".mp3"));

                                    //写入数据库
                                    Song.create({
                                        title: element.name,
                                        album: element.al.name,
                                        artist: element.ar[0].name,
                                        cover: element.al.picUrl,
                                        mp3: 'mp3/' + element.id + '.mp3',
                                        ogg: 'mp3/' + element.id + '.mp3',
                                    }, function(err) {
                                        if (err)
                                            throw err;
                                    });
                                });
                            }
                        }
                    );
                }, this);
            }
        }
    );


});