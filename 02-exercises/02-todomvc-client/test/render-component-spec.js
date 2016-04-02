"use strict"
const Promise = require('bluebird')
const expect = require('chai').expect
const app = require('../server')
const fetch = require('node-fetch')
const fs = require('fs')

describe("rendering", function() {
  const serverPort = 3001
  
  before(done => {
    app.listen(serverPort, done)
  })
  
  it("renders bundle.js correctly", Promise.coroutine(function*() {
    /**
     * Fetch the bundle.js at `localhost:${serverPort}/static/bundle.js`
     * Check that it makes sense.
     * The best way to do it is to statically read dist/bundle.js 
     * and compare the first, say, 100 characters. 
     */
    expect(1).to.equal(2)
  }))
  
  it("renders index.html correctly", Promise.coroutine(function*() {
    /**
     * Fetch the HTML at `localhost:${serverPort}/`.
     * Check that it makes sense.
     * The best way to do it is to statically read client/index.html 
     * and compare the first, say, 100 characters. 
     */
    expect(1).to.equal(2)
  }))
})