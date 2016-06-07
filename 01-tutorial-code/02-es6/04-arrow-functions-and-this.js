const fs = require('fs')
const os = require('os')
const path = require('path')

const operations = {
  copyAdditions: '',
  copyFile: function(sourceFile, targetFile, cb) {
    const that = this
    
    fs.readFile(sourceFile, function (err, contentBuffer) {
      if (err)
        return cb(err)
        
      fs.writeFile(targetFile, contentBuffer + that.copyAdditions, 
        function (err) {
          if (err)
            return cb(err)
          
          cb()
        })
    })
  }    
}

const sourceFile = path.join(__dirname, 'data/hello-world.txt')
const targetFile = path.join(os.tmpdir(), 'copied-file.txt')

operations.copyAdditions = '!'
operations.copyFile(sourceFile, targetFile, err => {
    fs.readFile(targetFile, {encoding: 'utf-8'}, (err, content) =>
      console.log(content)
    )
})


/*
* The problem with this and callbacks
 */