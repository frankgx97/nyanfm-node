const express = require("express")
const router = express()

router.get("/", (req, res) => {
    req.models.bg.find({}, function(err, bg) {
        if (err)
            throw err;
        res.send(bg);
    });
});

module.exports = router