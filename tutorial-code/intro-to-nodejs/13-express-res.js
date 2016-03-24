const express = require('express')

const app = express()

app.get('/div', function(req, res) {
  if (parseInt(req.query.b) === 0)
    return res.status(500).end()
  res.type('application/json')
  res.send(
    JSON.stringify({value: parseInt(req.query.a) / parseInt(req.query.b)}))
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* res.status
* res.end
* res.type
*/
