"use strict"
const path = require('path')
const os = require('os')
const fs = require('fs')

function copyFile(sourceFile, targetFile, {copyAdditions}, cb) {
  fs.readFile(sourceFile, (err, contentBuffer) => {
    if (err)
      return cb(err)
      
    fs.writeFile(targetFile, contentBuffer + copyAdditions, err => {
      if (err)
        return cb(err)
      
      cb()
    })
  })
}

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

copyFile(sourceFile, targetFile, {copyAdditions: '!'}, err => {
    fs.readFile(targetFile, {encoding: 'utf-8'}, (err, content) =>
      console.log(content)
    )
})


/*
* destructuring parameter
*/