const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const checkTokenMiddleware = require('./app/middlewares/jsonwebtoken/check');
const compair = require('./compairAlgo.ts');
const routes = require('./app/routes');
/*************************************************/ 
/*** Initialisation des variabls d'environnement */
const dotenv = require('dotenv').config();

/************************************/
/*** Import de la connexion à la DB */
const mongodb = require("./db.config.js");
const sqlserverdb = require("./sqldb.config.js");
//compair.compair();



/****************************************************/ 
/*** Initialisation et mise en place du fichier log */
const path = require('path');
var fs = require('fs');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


/*****************************/
/*** Initialisation de l'API */
const app = express();
var corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  
  
};
app.use(morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }, stream: accessLogStream }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/***********************************/
/*** Import des modules de routage */
const userRoutes = require("./app/routes/user.routes.js");
const authRoutes = require("./app/routes/auth.routes.js");

/******************************/
/*** Mise en place du routage */

/********************************/
/*** Start serveur avec test DB */


app.use(routes);


mongodb.mongoose.connect(mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }).then(async () => {
    sqlserverdb.authenticate()
    .then(() => console.log('Connection to sql server has been established on port', process.env.SQL_PORT))
    .catch(err => console.error('Unable to connect to the database:', err));
  })
  .then(async () => {
    console.log("Connected to the database!");
    app.listen(process.env.API_PORT || dotenv.API_PORT, () => {
      console.log('Server app listening on port ' + process.env.API_PORT || dotenv.API_PORT)
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });






