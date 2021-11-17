const express = require("express");
const musicRouter = express.Router();
const MainController = require("../controllers/MainController");
const { authZ } = require("../middlewares/auth");
const findMusic = require("../middlewares/deezer");
const lyrics = require('../middlewares/lyrics')

musicRouter.get("/", MainController.readRecomendedSongs);
musicRouter.post("/", MainController.createSong);
musicRouter.get("/favorites", MainController.readFavorites);
musicRouter.post("/favorites/:id", MainController.createFavorite);
musicRouter.get('/search', findMusic, MainController.findMusicDeezer)
musicRouter.get('/searchLyrics', lyrics, MainController.findLyrics)
musicRouter.post('/lyrics', lyrics, MainController.createLyric)

musicRouter.patch("/favorites/:id", authZ, MainController.changeStatusFavorite);
musicRouter.delete("/favorites/:id", authZ, MainController.deleteFavorite);

module.exports = musicRouter;
