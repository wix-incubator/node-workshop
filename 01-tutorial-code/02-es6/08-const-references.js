"use strict"

const fibonacci = (n) => {
  const ab = {a: 0, b: 1}
  
  for (let i = 0; i < n ; ++i) {
    const tmp = ab.b
    ab.b = ab.b + ab.a
    ab.a = tmp
  }
  
  return ab.a
}

console.log(fibonacci(parseInt(process.argv[2] || process.argv[1])))

/*
* const vs let vs var
* process.argv
 */