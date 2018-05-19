//import { json } from '../../../../Library/Caches/typescript/2.6/node_modules/@types/express';

var express = require('express');
var router = express.Router();


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('product_inventory');



router.get('/autocomplete/', function(req, res, next) {
	let result = []; //Final result
	let type = String(req.query.type);
	
	let searchTermPrefix = String(req.query.searchTermPrefix);
	
	//retrieve and prepare parameters
	let midType = '"'+type+'"'
	let midstr = '"'+ searchTermPrefix+ '%"'

	//create sql query
	if(type == "brand"){
		var sql = 'SELECT DISTINCT brandname name, brandid id FROM product WHERE brandname LIKE ' + midstr+' ORDER BY name';
	}else if(type == 'catagory'){
		var sql = 'SELECT DISTINCT catagoryname name, catagoryid id FROM product WHERE catagoryname LIKE ' + midstr+' ORDER BY name';
	}
	else if(type == 'title'){
		var sql = 'SELECT DISTINCT title name, id FROM product WHERE title LIKE ' + midstr+' ORDER BY name';
	}
	
	//Read from db and send response
	db.all(sql, [], (err, rows) => {
		if (err) {
		  throw err;
		}
		rows.forEach((row) => {
		   result.push({id:row.id, name:row.name});
		  console.log(row.name);
		});
		res.status(200)
			.json({
	  		status: 'success',
	 	 	data: result
		});
	  });
	
});


router.post('/search/', function(req, res, next) {

	//get request body and variables 
	var data = req.body;
	if(req.body['conditions[0][fieldName]']){
		let v0= (req.body['conditions[0][fieldName]']);
	}
	if(req.body['conditions[0][values][]']){
		let v_arr0 = (req.body['conditions[0][values][]']);
		console.log(Array.isArray(v_arr0));
		console.log(v_arr0[0]);
		
	}


	
	if(req.body['conditions[1][fieldName]']){
		let v1 = (req.body['conditions[1][fieldName]']);
	}
	if(req.body['conditions[1][values][]']){
		let v_arr1 = (req.body['conditions[1][values][]']);
	}
	if(req.body['conditions[2][fieldName]']){
		let v2 = (req.body['conditions[2][fieldName]']);
	}
	if(req.body['conditions[2][values][]']){
		let v_arr2 = (req.body['conditions[2][values][]']);
	}
	let finalProduct = new Set([]);
	let sql = [];
	
	var temp = 'SELECT DISTINCT id, title, brandid, brandname, catagoryid, catagoryname FROM product WHERE '+ v1 +' = '+v_arr1[0];
	console.log(temp);
	//Minor problem code not working
	/*for(i=0;i<v_arr0.length;i++){
		var temp = 'SELECT id, title, brandid, brandname, catagoryid, catagoryname FROM product WHERE ' + v0 +' LIKE ' + v_arr0[i]+' ORDER BY id';
		sql.push(temp);
		console.log(temp);
	}
	for(i=0;i<v_arr1.length;i++){
		var temp = 'SELECT id, title, brandid, brandname, catagoryid, catagoryname FROM product WHERE ' + v1 +' LIKE ' + v_arr1[i]+' ORDER BY id';
		sql.push(temp);
	}
	for(i=0;i<v_arr2.length;i++){
		var temp = 'SELECT id, title, brandid, brandname, catagoryid, catagoryname FROM product WHERE ' + v2 +' LIKE ' + v_arr2[i]+' ORDER BY id';
		sql.push(temp);
	}
	var itemsProcessed =0;
	sql.forEach(function(item, index, data){
		
		db.all(data, [], (err, rows) => {
			if (err) {
			  throw err;
			}
			rows.forEach((row) => {
				finalProduct.add({id:row.id, title:row.title, brandId:row.brandid, brandName: row.brandname, catagoryId:row.catagoryid, catagoryName: row.catagoryname });
			  console.log(row.id);

			});
			
			if(itemsProcessed === data.length) {
				
			  }
		  });
		  
	});*/
	
		

	
	
	res.redirect('../../../');
});

module.exports = router;