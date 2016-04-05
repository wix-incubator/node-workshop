const fs = require('fs')
const os = require('os')
const path = require('path')

const sourceFile = path.join(__dirname, 'data/this-file-does-not-exist.txt')
const sourceFile2 = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

fs.readFile(sourceFile, function(err, contentBuffer) {
  if (err)
    return fs.readFile(sourceFile2, function(err, contentBuffer) {
      if (err)
        throw err
      next(contentBuffer)
    })
  else
    next(contentBuffer)
  
  function next(contentBuffer) {    
    fs.writeFile(targetFile, contentBuffer, function(err) {
      fs.readFile(targetFile, {encoding: 'utf-8'}, function(err, content) {
        console.log(content)
      })
    })
  }  
})

/*
* Handling err
* Callbacks and error handling make code horrible
* Unhandled exceptions 
 */