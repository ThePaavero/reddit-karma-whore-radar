const axios = require('axios')
const Judge = require('./Judge')
const express = require('express')
const app = express()
const port = 2020

app.get('/:username', (req, res) => {

  const username = req.params.username ? req.params.username.trim() : null

  if (!username) {
    res.json({
      success: false,
      error: 'Username as the first and only URL segment, please'
    }, 404)
  }

  const url = `https://www.reddit.com/user/${username}/about.json`

  axios.get(url)
    .then(response => {
      Judge.getVerdict(response.data.data)
        .then(verdict => {
          res.json({
            success: true,
            verdict
          }, 200)
        })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.toString()
      }, 404)
    })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
