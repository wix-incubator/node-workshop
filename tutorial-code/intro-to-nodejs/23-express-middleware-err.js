const express = require('express')
const fs = require('fs')
const os = require('os')

const app = express()

app.get('/error', function(req, res) {
  throw new Error('Hello, world')
})

app.use(function(err, req, res, next) {
  res.send(err.message)
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* error middleware
*/
