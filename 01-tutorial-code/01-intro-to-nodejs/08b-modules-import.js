const os = require('os')
const path = require('path')
const fs = require('fs')
const theModule = require('./08a-modules-export')

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

theModule.copyFile(sourceFile, targetFile, function(err) {
    fs.readFile(targetFile, {encoding: 'utf-8'}, function(err, content) {
      console.log(content)
    })
})

/*
* Importing modules
 */