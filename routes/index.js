var express = require('express');
var router = express.Router();
var appdata = require('../data.json');

/* GET home page. */
router.get('/', function(req, res) {
    var myArtwork = [];
    var myArtists = [];
    
    myArtists = appdata.speakers;
    appdata.speakers.forEach(function(item){
        myArtwork = myArtwork.concat(item.artwork);
    });
  res.render('index', 
             { title: 'Express',
                artwork: myArtwork,
                artists: myArtists,
                pagename: 'home'
             }
            );
});

var pg = require('pg');

router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send({results: result.rows} ); }
    });
  });
});

/* GET speakers page. */
router.get('/speakers', function(req, res) {
  var myArtwork = [];
  var myArtists = [];
  myArtists = appdata.speakers;

  appdata.speakers.forEach(function(item) {
    myArtwork = myArtwork.concat(item.artwork);
  });
  res.render('speakers', {
    title: 'Speakers',
    artwork: myArtwork,
    artists: myArtists,
    pagename: 'artistList'
  });
});


/* GET speakers detail page */
router.get('/speakers/:speakerid', function(req, res) {
  var myArtwork = [];
  var myArtists = [];

  appdata.speakers.forEach(function(item) {
    if (item.shortname == req.params.speakerid) {
      myArtists.push(item);
      myArtwork = myArtwork.concat(item.artwork);
    }
  });
  res.render('speakers', {
    title: 'Speakers',
    artwork: myArtwork,
    artists: myArtists,
    pagename: 'artistDetail'
  });
});



module.exports = router;
