const moment = require('moment')

const Jury = () => {

  const getVerdict = (evidence) => {

    const commentKarma = Number(evidence.comment_karma)
    const postKarma = Number(evidence.link_karma)
    const postVsCommentDelta = postKarma - commentKarma
    const accountCreated = moment(evidence.created, 'X').format('DD.MM.YYYY')
    const accountAge = moment(evidence.created, 'X').fromNow()

    if (postVsCommentDelta < 0) {
      return {
        verdict: 'User has more comment karma than post karma, so probably not a whore.',
        debugData: evidence,
      }
    }

  }

  return {
    getVerdict
  }
}

module.exports = Jury()
