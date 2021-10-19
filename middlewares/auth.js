const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authN = async (req, res, next) => {
  try {
    const { access_token } = req.headers

    const payload = verifyToken(access_token)

    const foundUser = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email
      }
    }) 

    if(!foundUser) {
      throw {name: "InvalidToken"}
    }

    req.user = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authN