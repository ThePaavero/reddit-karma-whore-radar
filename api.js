const axios = require('axios')
const express = require('express')
const app = express()
const port = 2020

const invalidCallMessage = 'Username as the first and only URL segment, please'

const getDataOnUser = (username) => {
  return new Promise((resolve, reject) => {
    resolve('ä:D')
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
      res.json(data)
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.toString()
      }, 404)
    })

  return res.json({
    success: true,
    data,
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
