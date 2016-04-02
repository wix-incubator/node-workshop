const express = require('express')
const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)

const app = express()

app.get('/hello', Promise.coroutine(function*(req, res) {
  try {
    const content = yield fs.readFileAsync(__dirname + '/data/hello-world.txt')
    res.send(content)
  }
  catch(err) {
    res.sendStatus(500, err.message)    
  }
}))

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening...')
})

/*
* Promises and express
*/
