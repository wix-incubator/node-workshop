"use strict"
const path = require('path')
const os = require('os')
const fs = require('fs')
const Promise = require('bluebird')

function copyFile(sourceFile, targetFile) {
  return Promise.promisify(fs.readFile)(sourceFile)
    .then(contentBuffer => {
      return Promise.promisify(fs.writeFile)(targetFile, contentBuffer)
    })
}

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

copyFile(sourceFile, targetFile)
  .then(content => 
    Promise.promisify(fs.readFile)(targetFile, {encoding: 'utf-8'}))
  .then(content => 
    console.log(content))
  .catch(err =>
    console.error(err))

/*
* Bluebird
* Promise.promisify
*/