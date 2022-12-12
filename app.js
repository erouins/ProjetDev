const express = require('express')
const router = require('./router/router.js')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

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
app.use(cors())
app.use(morgan())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(port, () => {
  console.log('Server app listening on port ' + port)
})