const express = require('express')
const router = require('./app/routes/user.routes')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001
const mongodb = require("./app/models")

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
      await mongodb.mongoose.disconnect()
    }
}

//rundb()

  

var corsOptions = {
  origin: "http://localhost:3001"
};

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})

app.use(router)
app.use(cors(corsOptions))
app.use(morgan())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || port, () => {
  console.log('Server app listening on port ' + port)
})