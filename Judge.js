const moment = require('moment')
const fs = require('fs')
const _ = require('lodash')

const Judge = () => {

  // For now, we'll just use a JSON file as our offender database.
  const whoreRegisterPath = `${__dirname}/whoreList.json`

  // Make sure we have a register file.
  if (!fs.existsSync(whoreRegisterPath)) {
    fs.closeSync(fs.openSync(whoreRegisterPath, 'w'))
  }

  // Open up the register data.
  const registerDataAsString = fs.readFileSync(whoreRegisterPath).toString()

  // Empty register. Don't try to parse it, just use an empty array.
  const registerData = registerDataAsString.trim() === '' ? [] : JSON.parse(registerDataAsString)

  const getSentence = (juryVerdictData) => {
    // @todo Do some judgy thinking here? For now, we'll just echo what the jury decided.
    return juryVerdictData
  }

  const markUserAsWhore = (sentence) => {
    // Add some metadata to our sentence object.
    sentence.courtDate = moment()
    sentence.courtDateHuman = sentence.courtDate.format('DD.MM.YYYY HH:mm')
    registerData.push(sentence)
    fs.writeFileSync(whoreRegisterPath, JSON.stringify(registerData, null, 2))
  }

  return {
    getSentence,
    markUserAsWhore
  }
}

module.exports = Judge()
