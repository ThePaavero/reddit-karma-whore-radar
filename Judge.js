const Judge = () => {

  const getVerdict = (evidence) => {

    console.log(evidence.comment_karma)
    console.log(evidence.link_karma)

    return new Promise((resolve, reject) => {
      const commentKarma = Number(evidence.comment_karma)
      const postKarma = Number(evidence.link_karma)
      const postVsCommentDelta = postKarma - commentKarma

      if (postVsCommentDelta < 0) {
        resolve({
          verdict: 'User has more comment karma than post karma, so probably not as asshole.'
        })
      }

      // We're not sure, return some values for possible further investigation.
      resolve({
        postVsCommentDelta
      })
    })
  }

  return {
    getVerdict
  }
}

module.exports = Judge()
