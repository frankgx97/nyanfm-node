const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")

router.get("/", (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    "csrf_token": ""
  }
  const songid = req.query.id
  const alg = "RT"
  const time = req.query.time || 25
  createWebAPIRequest(
    'music.163.com',
    `http://music.163.com/api/radio/trash/add?alg=${alg}&songId=${songid}&time=${time}`,
    'POST',
    data,
    cookie,
    music_req => res.send(music_req),
    err => res.status(502).send('fetch error')
  )
})



module.exports = router