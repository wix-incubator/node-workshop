"use strict"

const arr = ['Hello', 'World', 'This', 'Is', 'Great']

const [a, ...b] = arr

console.log(`${a}, ${b.join(' ')}`)

/*
* array destructuring
* template strings
 */