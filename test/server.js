const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// const bodyParser = require('body-parser');
const fs = require('fs');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(express.static(path.resolve(__dirname,'public'), {
  'maxAge': 0,
  'cacheControl': false,
  'lastModified': false,
  'etag': false
}));

app.use(express.static(path.resolve(__dirname,'../dist'), {
  'maxAge': 0,
  'cacheControl': false,
  'lastModified': false,
  'etag': false
}));

// console.log(__dirname+'/brew.txt');

// app.get('/Homebrew/install/master/install', function(req, res) {
//     res.end(fs.readFileSync(__dirname+'/brew.txt'));
// });

// app.get("*", function(req, res) {
//   res.sendFile(__dirname + '#STATIC_PATH#' + '/index.html')
// })
app.get("*", function(req, res) {
  res.status(404).end();
});

app.listen(port, function() {
  console.log('server started on port ' + port);
});
