const express = require('express')
const http = require('http')
const app = express()

var orm = require('orm')
var cors = require('cors')

app.use(cors())

var sql_connect = require('./conf.js');
var db_model = require('./models/song.js');
var db_bg_model = require('./models/bg.js');

app.use(orm.express(sql_connect.sql, {
    define: function(db, models, next) {
        models.song = db.define("song", db_model.schema);
        models.bg = db.define("bg", db_bg_model.schema);
        db.sync();
        next();
    }
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('mp3'));

app.use('/get_list', require('./router/getList'));

app.use('/get_bg', require('./router/getBg'));

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server running @${port}`)
})

module.exports = app