const express = require("express");
const musicRouter = express.Router();
const MainController = require("../controllers/MainController");
const { authZ } = require("../middlewares/auth");
const findMusic = require("../middlewares/deezer");
const lyrics = require('../middlewares/lyrics')

musicRouter.get("/", MainController.readRecomendedSongs);
musicRouter.post("/", lyrics, MainController.createSong);
musicRouter.get("/favorites", MainController.readFavorites);
musicRouter.post("/favorites/:id", MainController.createFavorite);
musicRouter.get('/search', findMusic, MainController.findMusicDeezer)

musicRouter.patch("/favorites/:id", authZ, MainController.changeStatusFavorite);
musicRouter.delete("/favorites/:id", authZ, MainController.deleteFavorite);

module.exports = musicRouter;
