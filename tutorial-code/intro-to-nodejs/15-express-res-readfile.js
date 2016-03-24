const express = require('express')
const fs = require('fs')

const app = express()

app.get('/hello', function(req, res) {
  fs.readFile(__dirname + '/data/hello-world.txt', function(err, content) {
    if (err)
      return res.sendStatus(500, err.message);
    res.send(content)    
  })
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* async response
*/
