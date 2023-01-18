const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compair = require('./compairAlgo.ts');
const passport = require('passport');
const routes = require('./app/routes');
const { jwtStrategy } = require('./app/config/passport');



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

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }, stream: accessLogStream }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


/******************************/
/*** Mise en place du routage */

app.use(routes);


global.io;

/********************************/
/*** Start serveur avec test DB */

const serverr = app.listen(process.env.API_PORT || dotenv.API_PORT, () => {
  console.log('Server app listening on port ' + process.env.API_PORT || dotenv.API_PORT)
});
global.io = require('socket.io')(serverr);

io.on('connection', (socket) => {
  socket.emit("welcome");
  console.log('connected socket')
});

const sendData = (action) => { 
  console.log(io)
  if (action == "orderModified"){
      io.emit('orderModified');
  }

}
mongodb.mongoose.connect(mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }).then(async () => {
    sqlserverdb.authenticate()
    .then(() => console.log('Connection to sql server has been established on port', process.env.SQL_PORT))
    .catch(err => console.error('Unable to connect to the database:', err));
  })
  .then( () => {
    console.log("Connected to the database!");
   

    
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  module.exports = {
    sendData,
  };








