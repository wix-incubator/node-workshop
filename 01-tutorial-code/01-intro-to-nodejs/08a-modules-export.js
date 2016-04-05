const fs = require('fs')

/* module. */exports.copyFile = function copyFile(sourceFile, targetFile, cb) {
  fs.readFile(sourceFile, function(err, contentBuffer) {
    if (err)
      return cb(err)
    fs.writeFile(targetFile, contentBuffer, function(err) {
      if (err)
        return cb(err)
      
      cb()
    })
  })
}

/*
* Creating a module
 */