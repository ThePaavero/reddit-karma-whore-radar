const axios = require('axios')
const express = require('express')
const app = express()
const port = 2020

const invalidCallMessage = 'Username as the first and only URL segment, please'

const getDataOnUser = (username) => {
  const url = `https://www.reddit.com/user/${username}/about.json`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
          resolve(response.data)
        }
      )
      .catch(console.error)
  })
}

app.get('/:username', (req, res) => {
  const username = req.params.username ? req.params.username.trim() : null
  if (!username) {
    res.json({
      success: false,
      error: invalidCallMessage
    }, 404)
  }
  getDataOnUser()
    .then(data => {
      return res.json({
        success: true,
        data,
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
