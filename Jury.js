const moment = require('moment')

const Jury = () => {

  const getVerdict = (evidence) => {

    const commentKarma = Number(evidence.comment_karma)
    const postKarma = Number(evidence.link_karma)
    const postVsCommentDelta = commentKarma - postKarma
    const accountAge = moment(evidence.created, 'X').fromNow()

    const redFlags = []

    // Comment karma vs. post karma.
    if (postVsCommentDelta < commentKarma * -1) {
      redFlags.push({
        verdictHuman: 'User has much more comment karma than post karma, so probably a whore.',
        verdictSlug: 'BAD_KARMA_BALANCE',
        details: {
          postVsCommentDelta,
        },
      })
    }

    // Lots of post karma and a new user?
    if (postKarma > 50000 && !accountAge.includes('years') && !accountAge.includes('months')) {
      redFlags.push({
        verdictHuman: 'User has lots of post karma and is a fairly new user.',
        verdictSlug: 'NEW_USER_HIGH_POST_KARMA',
      })
    }

    // Red flags?
    if (redFlags.length > 0) {
      return {
        verdict: 'GUILTY',
        redFlags,
      }
    }

    return {
      verdict: 'INNOCENT',
      redFlags,
    }
  }

  return {
    getVerdict
  }
}

module.exports = Jury()
