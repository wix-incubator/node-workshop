const fs = require('fs');

fs.readFile(__dirname + '/data/hello-world.txt', 
            {encoding: 'utf-8'}, function(err, content) {
  console.log(content);  
});

/*
* Asynchronous I/O
* Callbacks
* err
*/