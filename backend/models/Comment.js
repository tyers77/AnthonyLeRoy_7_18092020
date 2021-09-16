"use strict"; //optimisation et sécurité corrige les erreurs JS
module.exports = (sequelise, DataTypes) => {
  const Comment = sequelise.define("Comment", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
  };
  return Comment;
};
