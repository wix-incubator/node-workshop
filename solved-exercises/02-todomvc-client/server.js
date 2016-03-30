const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.use('/static', express.static(path.join(__dirname, 'client/dist')))
app.get('/', (req, res) => {
  res.type('text/html; charset=utf-8')
  fs.createReadStream(path.join(__dirname, 'client/index.html')).pipe(res)
})

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3000 
  
  app.listen(port, () => console.log(`Listening on port ${port}`))
}
