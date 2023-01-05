const Sequelize = require('sequelize');
const db = require('../../sqldb.config');

const User = db.define("User", {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
},);

User.sync();

module.exports = User;
