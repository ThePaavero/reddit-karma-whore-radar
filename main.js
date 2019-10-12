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
    const suspectOps = await Police.getUserData(username)

    // Show the jury the data on these OPs.
    const verdict = Jury.getVerdict(suspectOps)
    verdict.username = username
    const sentence = Judge.getSentence(verdict)
    Judge.markUserAsWhore(sentence)
  })
}

run()
