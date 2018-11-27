const finalhandler = require('finalhandler');
const http         = require('http');
const Router       = require('router');
const bandcamp     = require('bandcamp-scraper');
const fs           = require('fs');
 
let router = Router(); 
let handler = Router({mergeParams: true});
let handler2 = Router({mergeParams: true});
let handler3 = Router({mergeParams: true});

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

router.use('/albumsWithTag/:tag/:page', handler2);
handler2.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  let params = {
    "page": parseInt(req.params.page), 
    "tag": req.params.tag}
  ; 
  bandcamp.getAlbumsWithTag(params, function(error, albumsWithTag) {
    if (error) {
      res.statusCode = 500;
      res.end(error);
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(albumsWithTag));
    }
  });
});

router.use('/randomTag', handler3);
handler3.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  let rand = getRandomInt(3575+1)     
  get_line('bandcamp-tags.txt', rand, (err, line) => {
    if (err) {
      res.statusCode = 500;
      res.end(err);
    }
    else {
      res.end(JSON.stringify({"tag": line}));
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function get_line(filename, line_no, callback) {
    let stream = fs.createReadStream(filename, {
      flags: 'r',
      encoding: 'utf-8',
      fd: null,
      mode: 0666,
      bufferSize: 1024
    });

    let fileData = '';
    stream.on('data', function(data){
      fileData += data;

      // The next lines should be improved
      let lines = fileData.split("\n");

      if(lines.length >= +line_no){
        stream.destroy();
        callback(null, lines[+line_no]);
      }
    });

    stream.on('error', function(){
      callback('Error', null);
    });

    stream.on('end', function(){
      callback('File end reached without finding line', null);
    });
}

let server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
});
 
server.listen(4000);
