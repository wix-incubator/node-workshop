function rejectIfPair(v) {
  if (v % 2 === 0)
    return Promise.reject(new Error('Pairs are bad for you'))
  else
    return Promise.resolve('Pairs are good for you')
}

rejectIfPair(2)
  .then(v => {
    console.log(v)
    return Promise.resolve('Hello, world')
  })
  .catch(err => console.log(err.message))
  
  
  
/*
* Rejected promises
* catch
* Chaining of catch
*/