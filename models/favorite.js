'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.Song, {foreignKey: "SongId"})
    }
  };
  Favorite.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    SongId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};