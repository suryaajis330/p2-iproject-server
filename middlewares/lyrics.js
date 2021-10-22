const axios = require('axios')

const lyrics = async (req, res, next) => {
  try {
    const artist = req.query.search[0]
    const title = req.query.search[1]

    const response = await axios({
      url: `https://api.lyrics.ovh/v1/${artist}/${title}`,
      method: "GET",
    })

    req.body.lyrics = response.data.lyrics.split("\n").join(' ')

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = lyrics