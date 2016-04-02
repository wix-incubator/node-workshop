const expect = require('chai').expect
const asyncMult = require('./src/async-mult')
const asyncBadMult = require('./src/async-bad-mult')
const Promise = require('bluebird')

const promiseMult = Promise.promisify(asyncMult)
const promiseBadMult = Promise.promisify(asyncBadMult)

describe("mult", function() {
  it("01-should multiply stuff", () =>
    promiseMult(3, 4)
      .then(v =>
        promiseMult(v, 3))
      .then(v =>
        expect(v).to.equal(36))
  )
  
  it("02-should multiply negative and positive correctly", () =>
    promiseBadMult(3, -4)
      .then(v =>
        promiseBadMult(v, 3))
      .then(v =>
        expect(v).to.equal(-36))
    )
})

/*
* returning promises
*/
