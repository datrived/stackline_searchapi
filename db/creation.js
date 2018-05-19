var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('product_inventory');

//Create Table Products 
db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS product (id text PRIMARY KEY,
		title text NOT NULL,
        brandid text NOT NULL,
        brandname text NOT NULL,
		catagoryid text NOT NULL,
		catagoryname text NOT NULL )`, function(err, row){
        if (err){
            console.err(err);
            
        }
        else {
            console.log("Success");
        }
       
    });
   
});


//Closing the connection
db.close((err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Close the database connection.');
  });