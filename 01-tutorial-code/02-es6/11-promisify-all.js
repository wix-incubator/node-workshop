"use strict"
const path = require('path')
const os = require('os')
const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)

function copyFile(sourceFile, targetFile) {
  return fs.readFileAsync(sourceFile)
    .then(contentBuffer => {
      return fs.writeFileAsync(targetFile, contentBuffer)
    })
}

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

copyFile(sourceFile, targetFile)
  .then(content => 
    fs.readFileAsync(targetFile, {encoding: 'utf-8'}))
  .then(content => 
    console.log(content))
  .catch(err =>
    console.error(err))

/*
* Bluebird
* Promise.promisifyAll
*/