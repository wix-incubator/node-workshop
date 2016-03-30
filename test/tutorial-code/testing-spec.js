'use strict'
const testCommons = require('./test-commons')

const testingFolder = 'tutorial-code/testing'

describe("testing", function() {
  testCommons.testTests([
    {file: '01-mocha', failures: ['02-']},
    {file: '02-chai', failures: ['02-']},
    {file: '03-async', failures: ['02-']},
    {file: '04-promise', failures: ['02-']},
    {file: '05-coroutines', failures: ['02-']},
    {file: '06-e2e-cmd', failures: []},
    {file: '07-e2e-express', failures: []},
    {file: '08-component-express', failures: []},
    
  ], testingFolder, it)
})
