
module.exports = (sequelize, DataTypes) => {
const Post = sequelize.define('Post',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
 
    title:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    dateFr:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },

});
Post.associate = (models) => {
    Post.belongsTo(models.User,
    {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    Post.hasMany(models.Comment, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Post;
};
