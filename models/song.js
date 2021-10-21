"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Song.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      artist: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      cover: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      songUrl: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      fullSongUrl: {
        type: DataTypes.STRING,
        notEmpty: true,
      },
      lyrics: {
        type: DataTypes.TEXT,
        notEmpty: true,
      },
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
