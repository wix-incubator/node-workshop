const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

/**
** Replace the stub function with middleware that 
** will serve the files in 'client/dist'
*/
app.use('/static', function stub() {})
app.get('/', (req, res) => {
  res.type('text/html; charset=utf-8')
  /**
   * Serve the file client/index.html in this request 
   */
})

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3000 
  
  app.listen(port, () => console.log(`Listening on port ${port}`))
}
