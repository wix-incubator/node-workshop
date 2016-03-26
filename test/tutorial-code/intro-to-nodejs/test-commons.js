const child_process = require('child_process')
const path = require('path')
const expect = require('chai').expect

exports.testCommandLine = (tests, folderForTests, it) => {
  tests.forEach(test => 
    it(test.file, (done) => {
      const process = child_process.fork(
        path.join(folderForTests, test.file), {silent: true})
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
}