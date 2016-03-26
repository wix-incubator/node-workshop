const express = require('express')

const app = express()

app.get('/add', function(req, res) {
  res.send((parseInt(req.query.a) + parseInt(req.query.b)).toString())
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* curl 'http://localhost:3000/add?a=4&b=5'
* req.query
*/