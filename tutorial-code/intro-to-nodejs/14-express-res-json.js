const express = require('express')

const app = express()

app.get('/div', function(req, res) {
  if (parseInt(req.query.b) === 0)
    return res.sendStatus(500, 'Division by zero')
    
  res.json({value: parseInt(req.query.a) / parseInt(req.query.b)})
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* res.sendStatus
* res.json
*/
