const expect = require('chai').expect
const child_process = require('child_process')
const path = require('path')
const Promise = require('bluebird')
const fetch = require('node-fetch')
const introFolder = 'tutorial-code/intro-to-nodejs'

const execPath = (modulePath) =>
  `node_modules/.bin/babel-node ${modulePath}`
  
const httpFetch = (path) => 
  fetch(`http://localhost:3000/${path}`)
    .then(response => 
      response.ok ? 
        response.text() : 
        Promise.reject(new Error("bad response")))
     .then(text => {
       return text
     })

describe("intro-to-nodejs", function() {
  describe("cmd-programs", function() {
    const tests = [
      {file: '01-hello-world.js', expectedOut: 'Hello, world'},
      {file: '02-reading-a-file-sync.js', expectedOut: 'Hello, world'},
      {file: '03-reading-a-file.js', expectedOut: 'Hello, world'},
      {file: '04-copying-a-file.js', expectedOut: 'Hello, world'},
      {file: '05-handling-errors.js', expectedOut: 'Hello, world'},
      {file: '06-async-functions.js', expectedOut: 'Hello, world'}
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
        file: '07-http-server',
        expectedOut: 'hello,world,goodbye',
        fetch: ['hello', 'world', 'close']
      },
      {
        file: '08-express',
        expectedOut: 'hello,world,goodbye',
        fetch: ['hello', 'world', 'close']
      },
      {
        file: '09-express-req-query',
        expectedOut: '9',
        fetch: ['add?a=4&b=5']
      },
      {
        file: '10-express-req-param',
        expectedOut: '14',
        fetch: ['add/4/10']
      }
    ]
    
    tests.forEach(test => {
      it(test.file, (done) => {
        const command = execPath(path.join(introFolder, test.file)).split(' ')
        const testProcess = child_process.fork(
          path.join(introFolder, test.file), {silent: true})          
        const killTestProcess = (v) => {
          testProcess.kill()
          return v
        }
        
        testProcess.stdout.on('data', (d) => {
          Promise.all(test.fetch.map(f => httpFetch(f)))
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
