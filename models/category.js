"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Course);
    }

    static search(search) {
      return new Promise((resolve, reject) => {
        Course.findAll({
          where: {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
        })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => reject(err));
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      urlVideo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
