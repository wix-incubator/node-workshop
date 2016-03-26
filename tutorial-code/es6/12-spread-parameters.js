"use strict"

function join(separator, ...a) {
  let res = ''
  
  for (const m of a.slice(0, -1))
    res += (m + separator)
    
  res += a[a.length - 1]
  
  return res  
}

console.log(join(' ', 'Hello', 'World', 'This', 'Is', 'Great'))

/*
* for... of
* spread parameters
 */