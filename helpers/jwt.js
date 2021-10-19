const jwt = require('jsonwebtoken')

const secretJWT = process.env.SECRET_JWT

const signToken = (payload) => {
  return jwt.sign(payload, secretJWT)
}

const verifyToken = (token) => {
  return jwt.verify(token, secretJWT)
}

module.exports = {
  signToken,
  verifyToken
}