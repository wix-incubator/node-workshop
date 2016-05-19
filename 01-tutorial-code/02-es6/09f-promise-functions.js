function delay(ms) {
  return new Promise(fulfill => setTimeout(fulfill, ms))
}

function delayTwice(ms) {
  return delay(ms)
    .then(() => delay(ms))
}

delayTwice(10)
  .then(() => console.log('Belated Hello'))
  
  
/*
* Functions returning promises
*/