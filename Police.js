const moment = require('moment')
const axios = require('axios')

const Police = () => {

  const patrol = async () => {
    const url = 'https://www.reddit.com/r/all.json'
    const response = await axios.get(url)
    console.log(response.data)
    return {
      todo: true,
    }
  }

  const getUserData = async (username) => {
    const url = `https://www.reddit.com/user/${username}/about.json`
    const response = await axios.get(url)
    return response.data.data
  }


  return {
    patrol,
    getUserData
  }
}

module.exports = Police()
