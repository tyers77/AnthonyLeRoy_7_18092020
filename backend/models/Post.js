
module.exports = (sequelize, DataTypes) => {
const Post = sequelize.define('Post',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    titre:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    media: {
        type: DataTypes.STRING,
        allowNull: true
    },

});
Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.hasMany(models.Comment);
    /*Comment.hasMany(models.RateComment, {
      foreignKey: {
        allowNull: true,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });*/
};

    return Post;
}