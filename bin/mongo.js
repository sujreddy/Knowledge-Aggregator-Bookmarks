var express = require('express');
var router = express.Router();
var mongo = require('mongodb');//import mondodb
var assert =require('assert');//to check values

var url='mongodb://localhost:27017/local';
console.log('connceted to mongo');

router.post('/submit', function(req, res, next) {
	var item={
		title: req.body.Title,
		URL: req.body.URL,
		Searchtag: req.body.Searchtag,
		privacyType: req.body.privacyType
	};
  //res.redirect('/test/'+{output: req.params.id});
  mongo.connect(url, function(err, db){
  	assert.equal(null, err);
  	db.collection('bookmark').insert(item, function(err, result){
  		assert.equal(null, err);
  		console.log('Item inserted');
  		db.close();
  	});
  })
  var newbody=req.body;
  
  console.log(newbody);
  //res.redirect('/bookmark/' +newbody+newbody2);
  res.json(newbody);
  console.log(res);
});

module.exports = router;