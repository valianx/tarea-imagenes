const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Model = Sequelize.Model;

class Post extends Model { }
Post.init(
    {
        // attributes
        titulo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        imagen: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        video: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        sequelize,
        modelName: "posts",
        // options
    }
);
Post.belongsTo(User, {
    foreignKey: "user_post",
    constraints: false,
});
// User.sync({ alter: true }).then(() => { });
// Post.sync({ force: true }).then(() => { });

module.exports = Post;