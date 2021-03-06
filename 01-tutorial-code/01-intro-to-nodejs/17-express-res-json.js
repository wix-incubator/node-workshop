const express = require('express')

const app = express()

app.get('/div', function(req, res) {
  if (parseInt(req.query.b) === 0)
    return res.status(500).end('Division by zero')

  res.json({value: parseInt(req.query.a) / parseInt(req.query.b)})
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* curl 'http://localhost:3000/div?a=4&b=5'
* curl -I 'http://localhost:3000/div?a=4&b=0'
* curl -i 'http://localhost:3000/div?a=4&b=0'
* res.sendStatus
* res.json
*/
