'use strict'
const testCommons = require('./test-commons')
const os = require('os')

const introFolder = '01-intro-to-nodejs'

describe("intro-to-nodejs", function() {
  describe("cmd-programs", function() {
    testCommons.testCommandLine([
      {file: '01-hello-world.js', expectedOut: 'Hello, world'},
      {file: '02-reading-a-file-sync.js', expectedOut: 'Hello, world'},
      {file: '03-reading-a-file.js', expectedOut: 'Hello, world'},
      {file: '04-copying-a-file.js', expectedOut: 'Hello, world'},
      {file: '05-handling-errors.js', expectedOut: 'Hello, world'},
      {file: '06-async-functions.js', expectedOut: 'Hello, world'},
      {file: '07b-modules-import-default.js', expectedOut: 'Hello, world'},
      {file: '08b-modules-import.js', expectedOut: 'Hello, world'},
      {file: '09-npm.js', expectedOut: 'x  Hello, world x'}
    ], introFolder, it)
  })
  
  describe("http-programs", function() {
    this.timeout(5000)
    const tests = [
      {file: '10-http-server', expectedOut: 'hello,world,goodbye', fetch: ['hello', 'world', 'close']},
      {file: '11-express', expectedOut: 'hello,world,goodbye', fetch: ['hello', 'world', 'close']},
      {file: '12-express-req-query', expectedOut: '9', fetch: ['add?a=4&b=5']},
      {file: '13-express-req-param', expectedOut: '14', fetch: ['add/4/10']},
      {file: '14b-express-req-post', expectedOut: '10', fetch: [{path: 'add', a: '4', b: '6'}]},
      {file: '15-express-req-json', expectedOut: '11', fetch: [{path: 'add', a: '5', b: '6', asJson: true}]},
      {file: '16-express-res', expectedOut: '{"value":5}', fetch: ['div?a=20&b=4']},
      {file: '17-express-res-json', expectedOut: '{"value":5}', fetch: ['div?a=20&b=4']},
      {file: '18-express-res-readfile', expectedOut: 'Hello, world', fetch: ['hello']},
      {file: '19-express-res-sendfile', expectedOut: 'Hello, world', fetch: ['hello']},
      {file: '20-express-res-stream', expectedOut: 'Hello, world', fetch: ['hello']},
      {file: '21-express-res-stream-file', expectedOut: 'Hello, world', fetch: ['hello']},
      {file: '22-express-middleware-static', expectedOut: 'Hello, world', fetch: ['hello-world.txt']},
      {file: '23-express-middleware-yours', expectedOut: os.hostname() + ' on ' + os.platform(), fetch: ['']},
      {file: '24-express-middleware-err', expectedOut: 'Hello, world', fetch: ['error']},
      {file: '25-express-rendering-engines', expectedOut: 'Hello, World', fetch: ['hello']}
    ]

    testCommons.testServer(tests, introFolder, it)    
  })
})
