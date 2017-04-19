const express = require("express")
const router = express()

router.get("/", (req, res) => {
    req.models.song.find({}, function(err, song) {
        if (err)
            throw err;
        res.send(song);
    });
});

module.exports = router