'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // this.hasMany(models.Comment, { foreignKey: 'post_id' });
      // this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'cascade' });
    }
  }

  Todo.init(
    {
      todo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      todo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detailContent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      done: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );

  return Todo;
};
