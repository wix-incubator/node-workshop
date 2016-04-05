const express = require('express')
const fs = require('fs')
const os = require('os')

const app = express()

app.use(function(req, res, next) {
  res.set('X-Wix-Server', os.hostname() + ' on ' + os.platform())
  next()
})

app.get('/', function(req, res) {
  res.send(res.get('X-Wix-Server'))
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* writing middleware
*/
