const express = require('express')
const fs = require('fs')

const app = express()

app.use('/', express.static(__dirname + '/data'))

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* express.static
*/
