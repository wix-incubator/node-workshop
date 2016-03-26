'use strict'

const expect = require('chai').expect
const child_process = require('child_process')
const path = require('path')
const Promise = require('bluebird')
const fetch = require('node-fetch')
const querystring = require('querystring')
const os = require('os')

const introFolder = 'tutorial-code/intro-to-nodejs'
const execPath = (modulePath) =>
  `node_modules/.bin/babel-node ${modulePath}`
  
const httpFetch = (path) =>  {
  let request
  if (typeof path === 'string') {
    request = fetch(`http://localhost:3000/${path}`)
  }
  else {
    request = fetch(`http://localhost:3000/${path.path}`, {
      method: 'POST',
      body: path.asJson ? JSON.stringify(path) : querystring.stringify(path),
      headers: {'Content-Type': path.asJson ?
        'application/json' : 
        'application/x-www-form-urlencoded'}
    })
  }
  
  return request.then(response => 
    response.ok ? 
      response.text() : 
      Promise.reject(new Error("bad response")))
    .then(text => {
      return text
    })
}

describe("intro-to-nodejs", function() {
  describe("cmd-programs", function() {
    const tests = [
      {file: '01-hello-world.js', expectedOut: 'Hello, world'},
      {file: '02-reading-a-file-sync.js', expectedOut: 'Hello, world'},
      {file: '03-reading-a-file.js', expectedOut: 'Hello, world'},
      {file: '04-copying-a-file.js', expectedOut: 'Hello, world'},
      {file: '05-handling-errors.js', expectedOut: 'Hello, world'},
      {file: '06-async-functions.js', expectedOut: 'Hello, world'},
      {file: '07b-modules-import-default.js', expectedOut: 'Hello, world'},
      {file: '08b-modules-import.js', expectedOut: 'Hello, world'}
    ]
    
    tests.forEach(test => 
      it(test.file, (done) => {
        const process = child_process.fork(
          path.join(introFolder, test.file), {silent: true})
        let stdout = '';
        process.stdout.on('data', (data) =>
          stdout += data.toString()  
        )
        process.on('err', done)
        process.on('exit', (code) => {
          expect(code).to.be.equal(0)
          expect(stdout.trim()).to.equal(test.expectedOut)
          done();
        })  
      })
    )
  })
  
  describe("http-programs", function() {
    this.timeout(5000)
    const tests = [
      {
        file: '09-http-server',
        expectedOut: 'hello,world,goodbye',
        fetch: ['hello', 'world', 'close']
      },
      {
        file: '10-express',
        expectedOut: 'hello,world,goodbye',
        fetch: ['hello', 'world', 'close']
      },
      {
        file: '11-express-req-query',
        expectedOut: '9',
        fetch: ['add?a=4&b=5']
      },
      {
        file: '12-express-req-param',
        expectedOut: '14',
        fetch: ['add/4/10']
      },
      {
        file: '13b-express-req-post',
        expectedOut: '10',
        fetch: [{path: 'add', a: '4', b: '6'}]
      },
      {
        file: '14-express-req-json',
        expectedOut: '11',
        fetch: [{path: 'add', a: '5', b: '6', asJson: true}]
      },
      {
        file: '15-express-res',
        expectedOut: '{"value":5}',
        fetch: ['div?a=20&b=4']
      },
      {
        file: '16-express-res-json',
        expectedOut: '{"value":5}',
        fetch: ['div?a=20&b=4']
      },
      {
        file: '17-express-res-readfile',
        expectedOut: 'Hello, world',
        fetch: ['hello']
      },
      {
        file: '18-express-res-sendfile',
        expectedOut: 'Hello, world',
        fetch: ['hello']
      },
      {
        file: '19-express-res-stream',
        expectedOut: 'Hello, world',
        fetch: ['hello']
      },
      {
        file: '20-express-res-stream-file',
        expectedOut: 'Hello, world',
        fetch: ['hello']
      },
      {
        file: '21-express-middleware-static',
        expectedOut: 'Hello, world',
        fetch: ['hello-world.txt']
      },
      {
        file: '22-express-middleware-yours',
        expectedOut: os.hostname() + ' on ' + os.platform(),
        fetch: ['']
      },
      {
        file: '23-express-middleware-err',
        expectedOut: 'Hello, world',
        fetch: ['error']
      },
      {
        file: '24-express-rendering-engines',
        expectedOut: 'Hello, World',
        fetch: ['hello']
      }
    ]
    
    tests.forEach(test => {
      it(test.file, (done) => {
        const testProcess = child_process.fork(
          path.join(introFolder, test.file), {silent: true})          
        const killTestProcess = (v) => {
          testProcess.kill()
          return v
        }
        testProcess.stdout.on('data', (d) => {
          Promise.all(test.fetch.map(httpFetch))
            .then(fetchResults => { 
              expect(fetchResults.join(',')).to.equal(test.expectedOut)
            })
            .then(killTestProcess, killTestProcess)
            .then(done, done)          
        })
      })
    })
  })
})
