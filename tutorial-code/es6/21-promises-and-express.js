const express = require('express')
const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)

const app = express()

app.get('/hello', (req, res) =>
  fs.readFileAsync(__dirname + '/data/hello-world.txt')
    .then(content => 
      res.send(content))
    .catch(err =>
       res.sendStatus(500, err.message)))

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* Promises and express
*/
