const { Song, Favorite } = require("../models");

class MainController {
  static async readRecomendedSongs(req, res, next) {
    try {
      const response = await Song.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async createSong(req, res, next) {
    try {
      const { title, duration, artist, cover, songUrl, fullSongUrl } = req.body;

      const response = await Song.create({
        title,
        duration: +duration,
        artist,
        cover,
        songUrl,
        fullSongUrl,
      });

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async createFavorite(req, res, next) {
    try {
      const songId = +req.params.id;

      const foundSong = await Song.findByPk(songId);

      if (!foundSong) {
        throw { name: "NotFound" };
      }

      const response = await Favorite.create({
        UserId: req.user.id,
        SongId: foundSong.id,
        status: "Good",
      });

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async readFavorites(req, res, next) {
    try {
      const response = await Favorite.findAll({
        where: {
          UserId: req.user.id,
        },
        include: Song
      });

      if (!response) {
        throw { name: "NotFound" };
      }

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async changeStatusFavorite(req, res, next) {
    try {
      const { status } = req.body;
      const favoriteId = +req.params.id;

      const response = await Favorite.update(
        { status },
        {
          where: {
            id: favoriteId,
          },
        }
      );

      res.status(200).json({message: "Status has been changed"})
    } catch (err) {
      next(err);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      const favoriteId = +req.params.id

      await Favorite.destroy({
        where: {
          id: favoriteId
        }
      })

      res.status(200).json({message: "Favorite has been deleted"})
    } catch (err) {
      next(err);
    }
  }

  static async findMusicDeezer(req, res, next) {
    try {
      const dataSearch = req.music
      
      res.status(200).json(dataSearch)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MainController;
