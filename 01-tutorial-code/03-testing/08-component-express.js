'use strict'
const expect = require('chai').expect
const Promise = require('bluebird')
const fetch = require('node-fetch')

const waitUntilListening = (subProcess) => 
  new Promise((fulfill, reject) => {
    subProcess.stdout.on('data', fulfill)
    subProcess.on('err', reject)
    subProcess.on('exit', (code) => 
      code === 0 ? fulfill() : reject(new Error(`Process returned ${code}`)))
  })

describe("mult", function() {
  const PORT_NUMBER = 5364
  let server
  before((done) => {
    const app = require(`${__dirname}/src/express-mult-dual.js`)
    
    server = app.listen(PORT_NUMBER, done)
  })
  
  after(() => server.close())
  
  it("01-should multiply stuff", Promise.coroutine(function*() {
    const response = yield fetch(`http://localhost:${PORT_NUMBER}/mult?a=5&b=6`)
    expect(response.ok).to.be.true
    
    const body = yield response.text()
    expect(body).to.equal('30')
  }))
  
  it("02-should multiply negatives", Promise.coroutine(function*() {
    const response = yield fetch(`http://localhost:${PORT_NUMBER}/mult?a=5&b=-6`)
    expect(response.ok).to.be.true
    
    const body = yield response.text()
    expect(body).to.equal('-30')
  }))
})


/*
* before/after
* dual mode modules
* app.close
*/