'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lyric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lyric.init({
    title: DataTypes.STRING,
    lyrics: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Lyric',
  });
  return Lyric;
};