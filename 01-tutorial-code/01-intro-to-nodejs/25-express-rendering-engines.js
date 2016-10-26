const express = require('express')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/hello', function(req, res) {
  res.render('index', {firstWord: 'Hello', secondWord: 'World'})
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* curl -i 'http://localhost:3000/hello'
* view engines
* res.render
* npm install --save ejs
* ejs
*/
