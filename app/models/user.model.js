const Sequelize = require('sequelize');
const db = require('../../sqldb.config');

const User = db.define("User", {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  accountType: {
    type: Sequelize.STRING
  },
},);

User.sync();

module.exports = User;
