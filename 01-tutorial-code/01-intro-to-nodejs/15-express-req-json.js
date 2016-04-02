const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.post('/add', function(req, res) {
  res.send((parseInt(req.body.a) + parseInt(req.body.b)).toString())
})

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...')
})

/*
* curl 'http://localhost:3000/add' -X POST -d '{"a":4,"b":5}' \
*    -H "Content-Type=application/json"
* bodyParser.json
*/
