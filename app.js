const express = require('express')
const http = require('http')
const app = express()

var orm = require('orm')
var cors = require('cors')

app.use(cors())

var config = require('./conf.js');
var db_model = require('./models/song.js');
var db_bg_model = require('./models/bg.js');

app.use(orm.express(config.sql, {
    define: function(db, models, next) {
        models.song = db.define("song", db_model.schema);
        models.bg = db.define("bg", db_bg_model.schema);
        db.sync();
        next();
    }
}));

app.set('view engine', 'ejs');
if (!config.isApiServer) {
    app.use(express.static('public'));
}

app.use('/get_list', require('./router/getList'));

app.use('/get_bg', require('./router/getBg'));

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`server running @${port}`)
})

module.exports = app