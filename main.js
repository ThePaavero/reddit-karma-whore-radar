const axios = require('axios')
const Judge = require('./Judge')
const Jury = require('./Jury')
const Police = require('./Police')

const run = async () => {

  // Tell the police to get top posts that CAN be reposts.
  const suspectPosts = await Police.patrol()

  suspectPosts.forEach(async post => {
    // Tell the police to frisk the OP.
    const suspectOps = await Police.getUserData(post.data.author)
    // Show the jury the data on these OPs.
    const verdicts = Jury.getVerdict(suspectOps)
    // console.log(JSON.stringify(verdicts, null, 2))
  })
}

run()
