const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Model = Sequelize.Model;

class User extends Model {}
User.init(
  {
    // attributes
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    }
  },
  {
    sequelize,
    modelName: "User"
    // options
  }
);
// User.sync({ alter: true }).then(() => { });
// User.sync({ force: true }).then(() => {});
module.exports = User;