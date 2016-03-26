const child_process = require('child_process')
const path = require('path')
const expect = require('chai').expect

exports.testCommandLine = (tests, folderForTests, it) => {
  tests.forEach(test => 
    it(test.file, (done) => {
      const process = test.babel ? 
        child_process.fork('node_modules/.bin/babel-node', 
          [path.join(folderForTests, test.file)].concat(test.args || []), 
            {silent: 'true'}) :
          child_process.fork(path.join(folderForTests, test.file), 
            test.args || [], {silent: true})
      
      let stdout = ''
      process.stdout.on('data', (data) =>
        stdout += data.toString()  
      )
      process.on('err', done)
      process.on('exit', (code) => {
        expect(code).to.be.equal(0)
        expect(stdout.trim()).to.equal(test.expectedOut)
        done()
      })  
    })
  )  
}