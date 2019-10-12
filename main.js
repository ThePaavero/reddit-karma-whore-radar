const axios = require('axios')
const Judge = require('./Judge')
const Police = require('./Police')

const run = async () => {
  const suspectPosts = await Police.patrol()
}

run()
