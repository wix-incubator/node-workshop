const expect = require('chai').expect;
const child_process = require('child_process');
const path = require('path');

const introFolder = 'tutorial-code/intro-to-nodejs';

describe("intro-to-nodejs", function() {
  const tests = [
    {file: '01-hello-world.js', expectedOut: 'Hello, world'},
    {file: '02-reading-a-file-sync.js', expectedOut: 'Hello, world'},
    {file: '03-reading-a-file.js', expectedOut: 'Hello, world'},
    {file: '04-copying-a-file.js', expectedOut: 'Hello, world'},
    {file: '05-handling-errors.js', expectedOut: 'Hello, world'},
  ];
  
  tests.forEach(test => 
      it(test.file, (done) => {
        child_process.exec(
          `node_modules/.bin/babel-node ${path.join(introFolder, test.file)}`, 
            (err, stdout) => {
              expect(err).to.be.falsy;
              expect(stdout.trim()).to.equal(test.expectedOut);
              done();
            })
      })
  );
});
