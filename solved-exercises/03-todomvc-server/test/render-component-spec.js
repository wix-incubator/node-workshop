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
    const res = yield fetch(`http://localhost:${serverPort}/static/bundle.js`)
    const body = yield res.text()
    
    const expectedBody = 
      yield fs.readFileAsync(`${__dirname}/../client/dist/bundle.js`, 
        {encoding: 'utf-8'})
        
    expect(body.substring(0, 50)).to.equal(expectedBody.substring(0, 50))
  }))
  
  it("renders index.html correctly", Promise.coroutine(function*() {
    const res = yield fetch(`http://localhost:${serverPort}/`)
    const body = yield res.text()
    
    const expectedBody = 
      yield fs.readFileAsync(`${__dirname}/../client/index.html`, 
        {encoding: 'utf-8'})
        
    expect(body.substring(0, 50)).to.equal(expectedBody.substring(0, 50))
  }))
})