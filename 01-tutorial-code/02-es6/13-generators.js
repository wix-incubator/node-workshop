"use strict"
function* generator() {
  yield "Hello"
  yield "World"
}

const iterator = generator()

console.log(iterator.next().value)
console.log(iterator.next().value)
console.log(iterator.next().done)

for (const v of generator())
  console.log(v)