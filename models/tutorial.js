'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tutorial.init({
    id: DataTypes.STRING,
    title: DataTypes.STRING,
    video_url: DataTypes.STRING,
    description: DataTypes.STRING,
    published_status: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tutorial',
  });
  return Tutorial;
};