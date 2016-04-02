const Promise = require('bluebird')
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

const DEFAULT_USER = 'user'

app.use('/static', express.static(path.join(__dirname, 'client/dist')))
app.get('/', (req, res) => {
  res.type('text/html; charset=utf-8')
  fs.createReadStream(path.join(__dirname, 'client/index.html')).pipe(res)
})

/**
 * Write the following controllers:
 * GET /api/todos: list the todos (as JSON)
 * POST /api/todos/{id}?text={text}: adds a todo
 * DELETE /api/todos/{id}: deletes a todo
 * PUT /api/todos/{id}/complete: toggles a todo
 * PUT /api/todos/{id}?text={text}: renames a todo
 * 
 * In all cases, use the db module you wrote in #01, with the DEFAULT_USER
 */

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3000 
  
  app.listen(port, () => console.log(`Listening on port ${port}`))
}
