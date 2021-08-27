var db = require('.');

module.exports = (sequelize, DataTypes) => {
const Post = sequelize.define('Post',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    UserId: {
        type: DataTypes.UUID,
        references: { 
            model: db.User, 
            key: 'id' },
        allowNull: false
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
    Post.belongsTo(models.User,{ onDelete: "CASCADE", foreignKey: 'UserId', sourceKey: 'id'});
    Post.hasMany(models.Comment,{ foreignKey: 'UserId', sourceKey: 'id' });
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