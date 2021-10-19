const express = require("express");
const musicRouter = express.Router();
const MainController = require("../controllers/MainController");
const { authZ } = require("../middlewares/auth");

musicRouter.get("/", MainController.readRecomendedSongs);
musicRouter.post("/", MainController.createSong);
musicRouter.get("/favorites", MainController.readFavorites);
musicRouter.post("/favorites/:id", MainController.createFavorite);

musicRouter.patch("/favorites/:id", authZ, MainController.changeStatusFavorite);
musicRouter.delete("/favorites/:id", authZ, MainController.deleteFavorite);

module.exports = musicRouter;
