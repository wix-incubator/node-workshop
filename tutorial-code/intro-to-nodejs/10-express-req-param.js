const express = require('express')

const app = express()

app.get('/add/:a/:b', function(req, res) {
  res.send((parseInt(req.params.a) + parseInt(req.params.b)).toString())
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* Express
* req.params
*/