"use strict"

function join(separator, ...a) {
  let res = ''
  
  for (const m of a.slice(0, -1))
    res += (m + separator)
    
  res += a[a.length - 1]
  
  return res  
}

const arr = ['Hello', 'World', 'This', 'Is', 'Great']

console.log(join(' ', ...arr))

/*
* spread arguments
 */