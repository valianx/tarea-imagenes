const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Model = Sequelize.Model;

class Post extends Model {}
Post.init(
  {
    // attributes
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descripcion: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    ciudad: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 1,
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    originalname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mimetype: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

Post.sync({ force: true }).then(() => {});

module.exports = Post;