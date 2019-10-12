const axios = require('axios')
const Judge = require('./Judge')
const Jury = require('./Jury')
const Police = require('./Police')

const run = async () => {

  // Tell the police to get top posts that CAN be reposts.
  const suspectPosts = await Police.patrol()

  suspectPosts.forEach(async post => {
    // Look up the author.
    const username = post.data.author

    // Tell the police to frisk the OP.
    const userData = await Police.getUserData(username)

    // Show the jury the data on these OPs.
    const verdict = Jury.getVerdict(userData)

    // Add the username. The jury doesn't need to know the username.
    verdict.username = username

    // Get the final verdict from the judge.
    const sentence = Judge.getSentence(verdict)

    // If the judge's sentence is "guilty", save the information. Innocent users don't need to be written down.
    if (sentence.verdict === 'GUILTY') {
      Judge.markUserAsWhore(sentence)
    }
  })
}

run()
