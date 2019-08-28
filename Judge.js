const moment = require('moment')

const Judge = () => {

  const getVerdict = (evidence) => {

    console.log(evidence.comment_karma)
    console.log(evidence.link_karma)

    return new Promise((resolve, reject) => {
      const commentKarma = Number(evidence.comment_karma)
      const postKarma = Number(evidence.link_karma)
      const postVsCommentDelta = postKarma - commentKarma
      const accountCreated = moment(evidence.created, 'X').format('DD.MM.YYYY')
      const accountAge = moment(evidence.created, 'X').fromNow()

      if (postVsCommentDelta < 0) {
        resolve({
          verdict: 'User has more comment karma than post karma, so probably not as asshole.',
          accountAge,
          accountCreated,
          debugData: evidence,
        })
      }

      // We're not sure, return some values for possible further investigation.
      resolve({
        postVsCommentDelta,
        accountAge,
        accountCreated,
        debugData: evidence,
      })
    })
  }

  return {
    getVerdict
  }
}

module.exports = Judge()
