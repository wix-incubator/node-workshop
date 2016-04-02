"use strict"
const Promise = require('bluebird')

function* generator() {
  yield Promise.resolve("Hello")
  yield Promise.resolve("World")
}

const iterator = generator()

iterator.next().value.then(v => {
  console.log(v)
  return iterator.next().value
}).then(v => {
  console.log(v)
})
