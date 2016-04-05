const express = require('express')

const app = express()

app.post('/add', function(req, res) {
  res.send((parseInt(req.body.a) + parseInt(req.body.b)).toString())
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* This doesn't work. req.body is undefined.
* curl 'http://localhost:3000/add' -X POST -d 'a=4' -d 'b=5'
* app.post
*/
