var finalhandler = require('finalhandler');
var http         = require('http');
var Router       = require('router');
var bandcamp     = require('bandcamp-scraper');
 
var router = Router(); 
var handler = Router({mergeParams: true});

router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end('Hello');
});

router.use('/albuminfo/*', handler);

handler.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  bandcamp.getAlbumInfo(req.params[0], function(error, albumInfo) {
    if (error) {
      res.statusCode = 500;
      res.end(error);
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(albumInfo));
    }
  });
});

var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
});
 
server.listen(4000);
