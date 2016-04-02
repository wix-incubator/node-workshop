const expect = require('chai').expect
const mult = require('./src/mult')
const badMult = require('./src/bad-mult')

describe("mult", function() {
  it("01-should multiply stuff", function() {
    expect(mult(3, 4)).to.equal(12)    
  })
  
  it("02-should multiply negative and positive correctly", function() {
    expect(badMult(3, -4)).to.equal(-12)    
  })
})

/*
* chai
* expect
*/
