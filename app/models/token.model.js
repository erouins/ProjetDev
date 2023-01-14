const Sequelize = require('sequelize');
const db = require('../../sqldb.config');
const { tokenTypes } = require('../config/tokens');

const tokenSchema = db.define("Token",
  {
    token: {
      type: Sequelize.STRING,
      required: true,
      index: true,
    },
    user: {
      type: Sequelize.MEDIUMINT,
      required: true,
    },
    type: {
      type: Sequelize.STRING,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Sequelize.DATE,
      required: true,
    },
    blacklisted: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.sync();


module.exports = tokenSchema;
