'use strict'
const expect = require('chai').expect
const Promise = require('bluebird')
const fetch = require('node-fetch')

describe("mult", function() {
  const PORT_NUMBER = 5364
  let server
  before((done) => {
    const app = require(`${__dirname}/src/express-mult-dual.js`)
    
    server = app.listen(PORT_NUMBER, done)
  })
  
  after(() => server.close())
  
  it("01-should multiply stuff", () => 
    fetch(`http://localhost:${PORT_NUMBER}/mult?a=5&b=6`)
      .then(response => {            
        expect(response.ok).to.be.true
        
        return response.text()
      })
      .then(body => 
        expect(body).to.equal('30')
      )
  )
  
  it("02-should multiply negatives", () => 
    fetch(`http://localhost:${PORT_NUMBER}/mult?a=5&b=-6`)
      .then(response => {            
        expect(response.ok).to.be.true
        
        return response.text()
      })
      .then(body => 
        expect(body).to.equal('-30')
      )
  )
})


/*
* before/after
* dual mode modules
* app.close
*/