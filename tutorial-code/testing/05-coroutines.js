const expect = require('chai').expect
const asyncMult = require('./src/async-mult')
const asyncBadMult = require('./src/async-bad-mult')
const Promise = require('bluebird')

const promiseMult = Promise.promisify(asyncMult)
const promiseBadMult = Promise.promisify(asyncBadMult)

describe("mult", function() {
  it("01-should multiply stuff", Promise.coroutine(function*() {
    const res = yield promiseMult(yield promiseMult(3, 4), 3)
    
    expect(res).to.equal(36)
  }))
  
  it("02-should multiply negative and positive correctly", 
    Promise.coroutine(function*() {
      const res = yield promiseBadMult(yield promiseBadMult(3, -4), 3)
    
      expect(res).to.equal(-36)
  }))
})

/*
* Using async coroutines 
*/