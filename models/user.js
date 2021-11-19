"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const hashingPassword = require("../helpers/hashingPassword");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Course, {
        through: "User_Courses",
      });
      User.hasOne(models.UserProfile);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: " must be valid email" },
          notEmpty: { msg: "email must not be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Password must not be empty" },
          len: {
            args: [8, 12],
            msg: "Password length must be in this range 8 => 12 ",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (instance, options) => {
          hashingPassword(instance.password);
        },
      },
    }
  );
  return User;
};
