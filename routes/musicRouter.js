const express= require('express')
const musicRouter = express.Router()

musicRouter.get('/', (req, res, next) => {
  res.status(200).json({message: 'Into music router'})
})

module.exports = musicRouter