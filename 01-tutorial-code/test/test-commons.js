"use strict"
const child_process = require('child_process')
const path = require('path')
const expect = require('chai').expect
const fetch = require('node-fetch')
const querystring = require('querystring')
const _ = require('lodash')

exports.testCommandLine = (tests, folderForTests, it) => {
  tests.forEach(test => 
    it(test.file, (done) => {
      const subProcess = 
        child_process.fork(path.join(folderForTests, test.file), 
          test.args || [], {silent: true})
      
      let stdout = ''
      subProcess.stdout.on('data', (data) =>
        stdout += data.toString()  
      )
      subProcess.on('err', done)
      subProcess.on('exit', (code) => {
        expect(code).to.be.equal(0)
        expect(stdout.trim()).to.equal(test.expectedOut)
        done()
      })  
    })
  )  
}
  
exports.httpFetch = (path) => {
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
}

exports.testServer = (tests, folderForTests, it) => {
  tests.forEach(test => 
    it(test.file, (done) => {
      const testProcess = child_process.fork(
        path.join(folderForTests, test.file), {silent: true})          
      const killTestProcess = (v) => {
        testProcess.kill()
        return v
      }
      testProcess.on('err', done)
      testProcess.stdout.on('data', (d) => {
        Promise.all(test.fetch.map(exports.httpFetch))
          .then(fetchResults => { 
            expect(fetchResults.join(',')).to.equal(test.expectedOut)
          })
          .then(killTestProcess, killTestProcess)
          .then(done, done)          
      })
    }))
}

exports.testTests = (tests, folderForTests, it) => {
  tests.forEach(test => 
    it(test.file, (done) => {
      const testProcess = child_process[process.platform === 'win32' ? 'spawn' : 'fork'](
          path.join('node_modules', '.bin', 'mocha') + 
            (process.platform === 'win32' ? '.cmd' : ''),
        [path.join(folderForTests, test.file + '.js'), 
        '--reporter', 'json'], {silent: true, stdio: 'pipe', shell: true})
      testProcess.on('err', done)
      let stdout = ''
      testProcess.stdout.on('data', (data) =>
        stdout += data.toString()  
      )
      testProcess.on('err', done)
      testProcess.on('exit', (code) => {
        expect(code).to.be.equal(test.failures.length > 0 ? 1 : 0)
        const testStatus = JSON.parse(stdout)
        for (const t of testStatus.tests) {
          if (t.err.message)
            expect(t.title).to.satisfy(title => 
              !!_.find(test.failures || [], f => title.indexOf(f) >= 0))
          else
            expect(t.title).to.satisfy(title => 
              !_.find(test.failures || [], f => title.indexOf(f) >= 0))
        }
        done()
      })  
    })
  )  
}