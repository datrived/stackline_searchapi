var express = require('express');
var router = express.Router();

var fs = require('fs');
var es = require("event-stream");
var parse = require('csv-parse');
var transform = require('stream-transform');
//var d3 = require('d3');
//const file = require('./sample_product_data.tsv')

global.brandTags = new Set([]);
global.catagoryTags = new Set([]);
global.titleTags = new Set([]);

// Create the parser

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('product_inventory');



/* GET users listing. */
router.get('/product_values', function(req, res, next){
  var input = fs.createReadStream(__dirname+'/sample_product_data.tsv')
  .pipe(es.split("\n"))
  // Split Strings into Array
  .pipe(es.mapSync(function(data) {
    

    
      return (data.split("\t"));
  })).pipe(es.mapSync(function(data) {
    titleTags.add(data[1]);
    brandTags.add(data[3]);
    catagoryTags.add(data[5]);
    db.run(`INSERT INTO product(id, title, brandid, brandname, catagoryid, catagoryname) VALUES(?, ?, ?, ?, ?, ?)`, [data[0], data[1], data[2], data[3], data[4], data[5]], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    return console.log("Sucess");
}))
  ;
  res.status(200)
	.json({
	  status: 'success',
	  message: 'Retrieved ALL puppies'
	});

});


module.exports = router;



/*
var input = fs.createReadStream(__dirname+'/sample_product_data.tsv');
	/*var parser = parse({delimiter: '\t', ltrim: true, trim: true, escape: '\n'});
  // Use the writable stream api
  


  
 
    parser.on('readable', function(){
	  while(record = parser.read()){
	  output.push(record);
	  }
    });
  // Catch any error
  parser.on('error', function(err){
	console.log(err.message);
  });


var parser = parse({delimiter: '\t'}, function(err, data){
  console.log(data);
});
  var transformer = transform(function(record, callback){
    setTimeout(function(){
      callback(null, record.join(' ')+'\n');
    }, 500);
  }, {parallel: 100});
 
  
  input.pipe(parser).pipe(transformer).pipe(process.stdout);
  // When we are done, test that the parsed output matched what expected
  for(i=0;i<output.length;i++){
	  console.log(output);
  }
  res.status(200)
	.json({
	  status: 'success',
	  data: output
	});

*/