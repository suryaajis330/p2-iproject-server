const axios = require('axios')

let code = "fredc1ddedd58b5b1e2f85a14a024de3"
let access_token = "fr2gBtTSFek2JU3YiEkHQqDOt1MdLXx6KEBQrLpsdgEvOrATgg"

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