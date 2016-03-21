const http = require('http');

const server = http.createServer(function(req, res) {
  if (req.url === '/hello')
    res.end('hello');
  if (req.url === '/world')
    res.end('world');
  else if (req.url === '/close') {
    res.end('goodbye');
    server.close();
  }
}).listen(process.env.PORT || 3000, function() {
  console.log('Listening...');
});

