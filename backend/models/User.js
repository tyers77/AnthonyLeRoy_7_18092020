'use strict'; //optimisation et sécurité corrige les erreurs JS 
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Comment, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  }
  console.log(User === sequelize.models.User);
  return User;
};


