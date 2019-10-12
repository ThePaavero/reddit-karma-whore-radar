const moment = require('moment')

const Jury = () => {

  const getVerdict = (evidence) => {

    const commentKarma = Number(evidence.comment_karma)
    const postKarma = Number(evidence.link_karma)
    const postVsCommentDelta = commentKarma - postKarma
    const accountAge = moment(evidence.created, 'X').fromNow()

    // Right from the start, if the user has lots of comment karma, we'll consider him a user who adds value to Reddit.
    if (commentKarma > 500) {
      return {
        verdict: 'INNOCENT',
        reasonHuman: 'Lots of comment karma',
        reasonSlug: 'HIGH_COMMENT_KARMA',
      }
    }

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
      reasonHuman: 'Red flags.',
      reasonSlug: 'RED_FLAGS',
      redFlags,
    }
  }

  return {
    getVerdict
  }
}

module.exports = Jury()
