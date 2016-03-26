"use strict"
const fs = require('fs')
const os = require('os')
const path = require('path')

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')


class Operations {
  constructor(copyAdditions) {
    this.copyAdditions = copyAdditions
  }
  
  copyFile(sourceFile, targetFile, cb) {
    fs.readFile(sourceFile, (err, contentBuffer) => {
      if (err)
        return cb(err)
        
      fs.writeFile(targetFile, contentBuffer + this.copyAdditions, err => {
        if (err)
          return cb(err)
        
        cb()
      })
    })
  }
}    

const operations = new Operations('!')
operations.copyFile(sourceFile, targetFile, err => {
    fs.readFile(targetFile, {encoding: 'utf-8'}, (err, content) =>
      console.log(content)
    )
})


/*
* How arrow functions solve the this problem in callbacks
 */