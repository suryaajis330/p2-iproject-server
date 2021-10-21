const axios = require('axios')

const deezer = axios.create({
  baseURL: "https://api.deezer.com"
})

const findMusic = async (req, res, next) => {
  try {
    const { q } = req.query

    const response = await deezer({
      url: "/search",
      method: "GET",
      params: {
        q: `${q}`,
        limit: 8
      }
    })

    req.music = response.data

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = findMusic