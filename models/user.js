'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Fullname is required'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Email is required'},
        isEmail: {msg: 'Invalid email format'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Password is required'}
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Role is required'}
      }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {msg: 'Image URL is required'},
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Phone is required'}
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Address is required'}
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};