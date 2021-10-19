const express= require('express')
const MainController = require('../controllers/MainController')
const musicRouter = express.Router()

musicRouter.get('/', MainController.readRecomendedSongs)
musicRouter.post('/', MainController.createSong)
musicRouter.get('/favorites', MainController.readFavorites)
musicRouter.post('/favorites/:id', MainController.createFavorite)

musicRouter.patch('/favorites/:id', MainController.changeStatusFavorite)
musicRouter.delete('/favorites/:id', MainController.deleteFavorite)

module.exports = musicRouter