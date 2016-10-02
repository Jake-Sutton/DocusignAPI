var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TDocs' });
});

/* GET home page. */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'TDocs - Create Event' });
});

/* GET home page. */
router.post('/home', function(req, res, next) {
  var db = req.db;
  var collection = db.get('Events');
  collection.find({},{},function(e,docs){
    res.render('home', {
      eventlist : docs
    });
  });
});

/* GET home page. */
router.post('/addevent', function(req, res, next) {
  var db = req.db;


  var eventName = req.body.event;
  console.log(eventName);
  var eventMessage = req.body.message;

  var collection = db.get('Events');

  collection.insert({
    "name" : eventName,
    "message" : eventMessage
  }, function(err, doc) {
   
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      res.redirect(307, "home");
    }
    // nope
  });
});

router.get('/events/:name', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Events');
    collection.find({name: req.params.name}, {}, function (e, docs) {
        res.render('event', {
            event: docs
        });
    });

});

module.exports = router;
