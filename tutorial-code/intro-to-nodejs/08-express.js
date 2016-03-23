const express = require('express');

const app = express();

app.use('/hello', function(req, res) {
  res.send('hello');
});
app.use('/world', function(req, res) {
  res.send('world');
});
app.use('/close', function(req, res) {
  res.send('goodbye');
  server.close();
});

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening...');
});