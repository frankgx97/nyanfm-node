const express = require("express")
const router = express()

router.get("/", (req, res) => {
    req.models.bg.find({}, function(err, bg) {
        if (err)
            throw err;
        var rst = []
        for (var i = 0; i < 20; i++) {
            rst.push(bg[Math.floor((Math.random() * bg.length - 1) + 0)].url + '!nyanfm.bg');
        }
        res.send(rst);
    });
});

module.exports = router