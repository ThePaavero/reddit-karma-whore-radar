const moment = require('moment')
const axios = require('axios')

const Police = () => {

  const patrol = async () => {
    const url = 'https://www.reddit.com/r/all.json'
    const response = await axios.get(url)
    return getSuspiciousPosts(response.data.data.children)
  }

  const getSuspiciousPosts = (posts) => {
    return posts.filter(post => {
      const data = post.data

      // Has to have lots of up votes.
      if (data.ups < 10000) {
        return false
      }

      // "Self" posts are rarely reposts.
      if (data.is_self) {
        return false
      }

      // "Pinned" and "Stickied" posts can't be reposts.
      if (data.pinned || data.stickied) {
        return false
      }

      // Guilty until proven innocent!
      return true
    })
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
