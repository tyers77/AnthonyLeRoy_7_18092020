module.exports = (sequelise, DataTypes) => {
  const Comment = sequelise.define("Comment", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislike: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
    /*Comment.hasMany(models.RateComment, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });*/
  };

  return Comment;
};