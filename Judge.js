const moment = require('moment')

const Judge = () => {

  const getSentence = (juryVerdictData) => {
    console.log(juryVerdictData)
  }

  return {
    getSentence
  }
}

module.exports = Judge()
