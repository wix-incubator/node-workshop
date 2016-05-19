Promise.resolve('Hello, world')
  .then(v => {
    console.log(v)
    Promise.resolve('Goodbye').then(v => console.log(v))
  })

/*
* Two promises
*/