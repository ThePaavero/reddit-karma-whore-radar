const moment = require('moment')

const Jury = () => {

  const getVerdict = (evidence) => {

    const commentKarma = Number(evidence.comment_karma)
    const postKarma = Number(evidence.link_karma)
    const postVsCommentDelta = postKarma - commentKarma
    const accountAge = moment(evidence.created, 'X').fromNow()

    const redFlags = []

    // Comment karma vs. post karma.
    if (postVsCommentDelta < 0) {
      redFlags.push({
        verdictHuman: 'User has more comment karma than post karma, so probably not a whore.',
        verdictSlug: 'BAD_KARMA_BALANCE',
      })
    }

    // Lots of post karma and a new user?
    if (postKarma > 10000 && !accountAge.includes('years')) {
      redFlags.push({
        verdictHuman: 'User has lots of post karma and is a fairly new user.',
        verdictSlug: 'NEW_USER_HIGH_POST_KARMA',
      })
    }

    console.log(JSON.stringify(redFlags, null, 2))

    return {
      verdict: 'User is alright',
      debugData: evidence,
    }
  }

  return {
    getVerdict
  }
}

module.exports = Jury()
