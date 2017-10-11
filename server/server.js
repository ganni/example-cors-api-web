
const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');


app.get('/api-local', function (req, res) {
  res.send('Hello World!');
});

app.use('/corsapi', proxy({
        target: 'http://api.some-cors-server.com',   /* end jinhen CORS APItai back-end url */
        changeOrigin: true,
        pathRewrite: {
          '^/corsapi': ''
        }
      }));

app.use(express.static('front'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});


app.listen(3000, function () {
  console.log('started listening on port 3000!');
});