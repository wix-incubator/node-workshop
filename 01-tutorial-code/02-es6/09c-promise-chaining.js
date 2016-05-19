Promise.resolve('Hello, world')
  .then(v => {
    console.log(v)
    return Promise.resolve('Goodbye')
  })
  .then(v => console.log(v))

/*
* Promise chaining
*/