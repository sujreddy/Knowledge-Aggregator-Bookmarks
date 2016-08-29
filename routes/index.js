var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongofile = require('./mongo');
var assert = require('assert');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' Knowledge Aggregator', condition: true });
});

/* Here is the post method to post data to web-server */
router.post('/submit', function(req, res) {
  

  //var bookmarkCreationTime= new Date();
  //req.createdDate=bookmarkCreationTime;
  //req.body=req.createdDate;
  console.log(req.body);
  var newbody = {};
  newBody = req.body;
  try {
  	//console.log(newBody);
  	var fromMongo=[];
  	fromMongo=mongofile.postToMongo(newBody);
  	console.log('###After submition '+fromMongo);
  	res.json(newbody);

  }
  catch(e){
  	console.log(e);
  }
});

/* Here is the methood to fetch data from MongoDB */

router.get('/get-data/', function(req, res){
	var url_parts = url.parse(req.url, true);

	var urlString=url_parts.query;
	console.log('urlString '+urlString.Title +urlString.privacyType);
	var urlTitle="/"+urlString.Title+"/i";
	console.log('urlTitle '+urlTitle);
	/*var stringifyval=JSON.stringify(urlString);
	console.log('JSON Format '+stringifyval);
	var resul = urlString.replace("+","");
	console.log('resul '+resul);
	var remov=resul.split("&");
	
	var jsonfor=JSON.stringify(remov[0]);
	
	var jsonparse=jsonfor.replace('=','":"');
	console.log('JSON Parse '+jsonparse);*/
	var datafromOngo=[];
	var newbody={};
	newbody=req.body;
	//console.log('newbody '+newbody.params.Title);
	
	try{
	var datafromOngo =  mongofile.fetchFromMongoDB(urlString.Title, urlString.privacyType);
	//console.log('Data from Mongo '+JSON.stringify(datafromOngo));	
	}	
	catch(e){
		console.log(e);
	}
	res.render('index', {items: datafromOngo});
});


module.exports = router;