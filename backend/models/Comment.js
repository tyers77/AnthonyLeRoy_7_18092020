module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define('Comment',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
          
            posted_date:{
                type:DataTypes.DATE,
                allowNull: false
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
}