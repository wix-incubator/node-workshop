'use strict'

const expect = require('chai').expect
const child_process = require('child_process')
const path = require('path')
const Promise = require('bluebird')
const fetch = require('node-fetch')
const querystring = require('querystring')
const os = require('os')
const testCommons = require('./test-commons')

const es6Folder = 'tutorial-code/es6'

describe.only("es6", function() {
  describe("cmd-programs", function() {
    testCommons.testCommandLine([
      {file: '01-arrow-functions-simple', expectedOut: 'HELLO, WORLD'},
      {file: '02-arrow-functions-callbacks', expectedOut: 'Hello, world'},
      {file: '03-arrow-functions-coolness', expectedOut: 'Hello, world'},
      {file: '04-simplified-object', expectedOut: 'Hello, world'},
      {file: '05-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '05b-arrow-functions-and-this', expectedOut: 'Hello, world!'},
      {file: '06-this-bites', expectedOut: 'Hello, world!'},
      {file: '06b-this-bites', expectedOut: 'Hello, worldundefined'},
      {file: '07-class', expectedOut: 'Hello, world!'},
    ], es6Folder, it)    
  })
})
