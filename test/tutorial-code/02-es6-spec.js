'use strict'
const testCommons = require('./test-commons')

const es6Folder = '01-tutorial-code/02-es6'

describe("es6", function() {
  describe("cmd-programs", function() {
    this.timeout(20000)
    testCommons.testCommandLine([
      {file: '01-arrow-functions-simple', expectedOut: 'HELLO, WORLD'},
      {file: '02-arrow-functions-callbacks', expectedOut: 'Hello, world'},
      {file: '03-arrow-functions-coolness', expectedOut: 'Hello, world'},
      {file: '04-simplified-object', expectedOut: 'Hello, world'},
      {file: '05-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '05b-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '06-this-bites', expectedOut: 'Hello, world!'},
      {file: '06b-this-bites', expectedOut: 'Hello, worldundefined'},
      {file: '07-let.js', args: ['6'], expectedOut: '8'}, /// 08 -> 07
      {file: '08-const-references.js', args: ['7'], expectedOut: '13'}, /// 09 -> 08
      {file: '09-promises.js', expectedOut: 'Hello, world'}, /// 18 -> 9
      {file: '10-promisify.js', expectedOut: 'Hello, world'},
      {file: '11-promisify-all.js', expectedOut: 'Hello, world'},
      {file: '13-generators', expectedOut: 'Hello\nWorld\ntrue\nHello\nWorld'},
      {file: '14-promise-generator', expectedOut: 'Hello\nWorld'},
      {file: '15-copy-file-as-coroutine', expectedOut: 'Hello, world'},
      {file: '15b-copy-file-as-coroutine', expectedOut: 'Hello, world'},
      {file: '17-class', expectedOut: 'Hello, world!'}, // 07 -> 16
      {file: '18-destructuring-array.js',  expectedOut: 'Hello, World', babel: true}, // 10 -> 16
      {file: '19-destructuring-spread.js',  expectedOut: 'Hello, World This Is Great', babel: true},
      {file: '20-spread-parameters.js',  expectedOut: 'Hello World This Is Great', babel: true},
      {file: '21-spread-args.js',  expectedOut: 'Hello World This Is Great', babel: true},
      {file: '22-destructuring-objs.js',  expectedOut: '1', babel: true},
      {file: '23-destructuring-simple-syntax.js', expectedOut: '1', babel: true},
      {file: '24-destructuring-parameter.js', expectedOut: 'Hello, world!', babel: true},
    ], es6Folder, it)    
  })
  
  describe("http-programs", function() {
    this.timeout(5000)
    const tests = [
      {file: '12-promises-and-express', expectedOut: 'Hello, world', fetch: ['hello']},
      {file: '16-coroutines-and-express', expectedOut: 'Hello, world', fetch: ['hello']},
    ]

    testCommons.testServer(tests, es6Folder, it)    
  })
  
})
