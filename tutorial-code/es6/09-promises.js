"use strict"
const path = require('path')
const os = require('os')
const fs = require('fs')

const readFileAsync = (f, options) => 
  new Promise((fulfill, reject) => {
    fs.readFile(f, options, (err, content) => {
      if (err)
        return reject(err)
        
      fulfill(content)
    })
  }) 

const writeFileAsync = (f, content) => 
  new Promise((fulfill, reject) =>
    fs.writeFile(f, content, (err) => 
      err ? reject(err) : fulfill())) 

function copyFile(sourceFile, targetFile) {
  return readFileAsync(sourceFile)
    .then(contentBuffer => {
      return writeFileAsync(targetFile, contentBuffer)
    })
}

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

copyFile(sourceFile, targetFile)
  .then(content => 
    readFileAsync(targetFile, {encoding: 'utf-8'}))
  .then(content => 
    console.log(content))
  .catch(err =>
    console.error(err))

/*
* Promises
* then
* catch
* Functions returning promises
* chaining of promises
*/