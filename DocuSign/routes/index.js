var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TDocs' });
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
