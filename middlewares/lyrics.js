const axios = require('axios')

const lyrics = async (req, res, next) => {
  try {
    const { artist, title } = req.body

    const response = await axios({
      url: `https://api.lyrics.ovh/v1/${artist}/${title}`,
      method: "GET",
    })

    req.body.lyrics = response.data.lyrics

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = lyrics