const express = require('express')

const app = express()

app.get('/hello', function(req, res) {
  res.send('hello')
})
app.get('/world', function(req, res) {
  res.send('world')
})
app.get('/close', function(req, res) {
  res.send('goodbye')
  server.close()
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* Express
* app.use
*/