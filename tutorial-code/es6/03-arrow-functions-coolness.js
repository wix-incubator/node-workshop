const fs = require('fs')
const os = require('os')
const path = require('path')

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

const copyFile = (sourceFile, targetFile, cb) => {
  fs.readFile(sourceFile, (err, contentBuffer) => {
    if (err)
      return cb(err)
      
    fs.writeFile(targetFile, contentBuffer, err => {
      if (err)
        return cb(err)
      
      cb()
    })
  })
}

copyFile(sourceFile, targetFile, err => {
    fs.readFile(targetFile, {encoding: 'utf-8'}, (err, content) =>
      console.log(content)
    )
})

/*
* Cool developers don't use 'function'
 */