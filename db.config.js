const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://' + process.env.ADMIN_NAME + ':' + process.env.ADMIN_PWD + 'cluster0.mxd2egq.mongodb.net/CesiEatsApi';
//db.users = require("./app/models/user.models")(mongoose)

module.exports = db;