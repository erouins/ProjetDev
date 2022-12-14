const express = require("express")
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const mongodb = require("./app/models")
const path = require('path')
var fs = require('fs')

async function rundb(){
  try{
    mongodb.mongoose
    .connect(mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(async () => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
  }
  finally {
      //await mongodb.mongoose.disconnect()
    }
}

rundb()

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })  

var corsOptions = {
  origin: "http://localhost:3001"
};


app.use(cors(corsOptions))
app.use(morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }, stream: accessLogStream }))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));


require("./app/routes/user.routes")(app)

app.listen(process.env.PORT || dotenv.PORT, () => {
  console.log('Server app listening on port ' + dotenv.PORT)
})