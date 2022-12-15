const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

/*************************************************/ 
/*** Initialisation des variabls d'environnement */
const dotenv = require('dotenv').config()

/************************************/
/*** Import de la connexion à la DB */
const mongodb = require("./db.config.js");






/****************************************************/ 
/*** Initialisation et mise en place du fichier log */
const path = require('path')
var fs = require('fs')
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })  


/*****************************/
/*** Initialisation de l'API */
const app = express()

var corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  origin: "http://localhost:" + process.env.PORT
};
app.use(morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }, stream: accessLogStream })) 
app.use(cors(corsOptions))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

/***********************************/
/*** Import des modules de routage */
const userRoutes = require("./app/routes/user.routes")
const authRoutes = require("./app/routes/auth.routes")

/******************************/
/*** Mise en place du routage */
app.get('/', (req, res) => res.send(`I'm online. All is OK !`))
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?!'))
/********************************/
/*** Start serveur avec test DB */
mongodb.mongoose.connect(mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
  .then(async () => {
    console.log("Connected to the database!");
    app.listen(process.env.PORT || dotenv.PORT, () => {
      console.log('Server app listening on port ' + process.env.PORT || dotenv.PORT)
    })

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



