const fs = require('fs')

fs.readFile(__dirname + '/data/hello-world.txt', {encoding: 'utf-8'}, 
    (err, content) => {
      if (err)
        return console.error('Oops, an error', err)

      console.log(content)  
    })

/*
* Arrow functions - more than one parameter
* Arrow functions - more than one line
* err
*/