const expect = require('chai').expect
const childProcess = require('child_process')
const Promise = require('bluebird')

const execAsync = Promise.promisify(childProcess.exec, {multiArgs: true})

describe("mult", function() {
  it("01-should multiply stuff", Promise.coroutine(function*() {
    const [stdout, stderr] = yield execAsync(`node "${__dirname}/src/cmd-mult.js" 4 5`)
    
    expect(stdout.trim()).to.equal('20')
    expect(stderr).to.equal('')
  }))
})

/*
* childProcess.exec
*/