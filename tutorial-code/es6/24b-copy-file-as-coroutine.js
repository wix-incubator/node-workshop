const Promise = require('bluebird')
const fs = require('fs')
Promise.promisifyAll(fs)
const path = require('path')
const os = require('os')

const copyFile = Promise.coroutine(function* (source, target) {
  const content = yield fs.readFileAsync(source)
  
  yield fs.writeFileAsync(target, content)
})

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

Promise.coroutine(function*() {
  try {
    yield copyFile(sourceFile, targetFile)
    const content = yield fs.readFileAsync(targetFile, {encoding: 'utf-8'})
    
    console.log(content)
  }
  catch (err) {
    console.error(err)
  }
})()
