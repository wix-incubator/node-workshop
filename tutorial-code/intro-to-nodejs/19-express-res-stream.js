const express = require('express')

const app = express()

app.get('/hello', function(req, res) {
  res.set('Content-Type', 'text/plain')
  
  res.write('Hello, ')
  res.write('world')
  res.end()
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* res as a stream
* res.set
*/
