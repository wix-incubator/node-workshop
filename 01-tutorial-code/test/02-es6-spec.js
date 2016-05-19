'use strict'
const testCommons = require('./test-commons')

const es6Folder = '02-es6'

describe("es6", function() {
  describe("cmd-programs", function() {
    this.timeout(20000)
    testCommons.testCommandLine([
      {file: '01-arrow-functions-simple', expectedOut: 'HELLO, WORLD'},
      {file: '02-arrow-functions-callbacks', expectedOut: 'Hello, world'},
      {file: '03-arrow-functions-coolness', expectedOut: 'Hello, world'},
      {file: '04-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '04b-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '05-this-bites', expectedOut: 'Hello, worldundefined'},
      {file: '05b-this-bites', expectedOut: 'Hello, world!'},
      {file: '06-simplified-object', expectedOut: 'Hello, world'},
      {file: '07-let.js', args: ['6'], expectedOut: '8'},
      {file: '08-const-references.js', args: ['7'], expectedOut: '13'},
      {file: '09a-promise-resolve.js', expectedOut: 'Hello, world'},
      {file: '09b-promise-two.js', expectedOut: 'Hello, world\nGoodbye'},
      {file: '09c-promise-chaining.js', expectedOut: 'Hello, world\nGoodbye'},
      {file: '09d-promise-ctor.js', expectedOut: 'Hello, world'},
      {file: '09e-promise-async.js', expectedOut: 'Hello, world'},
      {file: '09f-promise-functions.js', expectedOut: 'Belated Hello'},
      {file: '09g-promise-reject.js', expectedOut: 'Pairs are bad for you'},
      {file: '09h-callbacks-to-promises.js', expectedOut: 'Hello, world'},
      {file: '10-promisify.js', expectedOut: 'Hello, world'},
      {file: '11-promisify-all.js', expectedOut: 'Hello, world'},
      {file: '13-generators', expectedOut: 'Hello\nWorld\ntrue\nHello\nWorld'},
      {file: '14-promise-generator', expectedOut: 'Hello\nWorld'},
      {file: '15-copy-file-as-coroutine', expectedOut: 'Hello, world'},
      {file: '15b-copy-file-as-coroutine', expectedOut: 'Hello, world'},
      {file: '17-class', expectedOut: 'Hello, world!'},
      {file: '18-destructuring-array.js',  expectedOut: 'Hello, World'},
      {file: '19-destructuring-spread.js',  expectedOut: 'Hello, World This Is Great'},
      {file: '20-spread-parameters.js',  expectedOut: 'Hello World This Is Great'},
      {file: '21-spread-args.js',  expectedOut: 'Hello World This Is Great'},
      {file: '22-destructuring-objs.js',  expectedOut: '1'},
      {file: '23-destructuring-simple-syntax.js', expectedOut: '1'},
      {file: '24-destructuring-parameter.js', expectedOut: 'Hello, world!'},
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
