const Promise = require('bluebird')
const express = require('express')
const path = require('path')
const fs = require('fs')
const db = require('./lib/db')(path.join(__dirname, 'data'))

const app = express()

const DEFAULT_USER = 'user'

app.use('/static', express.static(path.join(__dirname, 'client/dist')))
app.get('/', (req, res) => {
  res.type('text/html; charset=utf-8')
  fs.createReadStream(path.join(__dirname, 'client/index.html')).pipe(res)
})

app.get('/api/todos', (req, res) => 
  db.listTodos(DEFAULT_USER).then(todos => res.json(todos)))

app.post('/api/todos/:id', (req, res) =>
  db.addTodo(DEFAULT_USER, req.query.text, parseInt(req.params.id))
    .then(() => res.sendStatus(200))  
)

app.delete('/api/todos/:id', (req, res) =>
  db.deleteTodo(DEFAULT_USER, parseInt(req.params.id))
    .then(() => res.sendStatus(200))  
)

app.put('/api/todos/:id/complete', (req, res) =>
  db.markTodo(DEFAULT_USER, parseInt(req.params.id))
    .then(() => res.sendStatus(200))  
)

app.put('/api/todos/:id', (req, res) =>
  db.renameTodo(DEFAULT_USER, req.query.text, parseInt(req.params.id))
    .then(() => res.sendStatus(200))  
)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3000 
  
  app.listen(port, () => console.log(`Listening on port ${port}`))
}
