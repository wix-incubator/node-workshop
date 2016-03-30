'use strict'
const testCommons = require('./test-commons')

const es6Folder = 'tutorial-code/es6'

describe("es6", function() {
  describe("cmd-programs", function() {
    testCommons.testCommandLine([
      {file: '01-arrow-functions-simple', expectedOut: 'HELLO, WORLD'},
      {file: '02-arrow-functions-callbacks', expectedOut: 'Hello, world'},
      {file: '03-arrow-functions-coolness', expectedOut: 'Hello, world'},
      {file: '04-simplified-object-functions', expectedOut: 'Hello, world'},
      {file: '05-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '05b-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '06-this-bites', expectedOut: 'Hello, world!'},
      {file: '06b-this-bites', expectedOut: 'Hello, worldundefined'},
      {file: '07-class', expectedOut: 'Hello, world!'},
      {file: '08-let.js', args: ['6'], expectedOut: '8'},
      {file: '09-const-references.js', args: ['7'], expectedOut: '13'},
      {file: '10-destructuring-array.js',  expectedOut: 'Hello, World', babel: true},
      {file: '11-destructuring-spread.js',  expectedOut: 'Hello, World This Is Great', babel: true},
      {file: '12-spread-parameters.js',  expectedOut: 'Hello World This Is Great', babel: true},
      {file: '13-spread-args.js',  expectedOut: 'Hello World This Is Great', babel: true},
      {file: '14-destructuring-objs.js',  expectedOut: '1', babel: true},
      {file: '15-simplified-fields.js', expectedOut: '5.8595', babel: true},
      {file: '16-destructuring-simple-syntax.js', expectedOut: '1', babel: true},
      {file: '17-destructuring-parameter.js', expectedOut: 'Hello, world!', babel: true},
      {file: '18-promises.js', expectedOut: 'Hello, world'},
      {file: '19-promisify.js', expectedOut: 'Hello, world'},
      {file: '20-promisify-all.js', expectedOut: 'Hello, world'},
      {file: '22-generators', expectedOut: 'Hello\nWorld\ntrue\nHello\nWorld'},
      {file: '23-promise-generator', expectedOut: 'Hello\nWorld'},
      {file: '24-copy-file-as-coroutine', expectedOut: 'Hello, world'},
      {file: '24b-copy-file-as-coroutine', expectedOut: 'Hello, world'},
    ], es6Folder, it)    
  })
  
  describe("http-programs", function() {
    this.timeout(5000)
    const tests = [
      {file: '21-promises-and-express', expectedOut: 'Hello, world', fetch: ['hello']},
      {file: '25-coroutines-and-express', expectedOut: 'Hello, world', fetch: ['hello']},
    ]

    testCommons.testServer(tests, es6Folder, it)    
  })
  
})
