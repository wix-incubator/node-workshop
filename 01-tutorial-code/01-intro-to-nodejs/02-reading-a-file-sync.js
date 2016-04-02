const fs = require('fs')

const content = fs.readFileSync(__dirname + '/data/hello-world.txt', 
                                {encoding: 'utf-8'})

console.log(content)

/*
* Synchronous I/O
* require and modules
* the FS module
* __dirname
*/