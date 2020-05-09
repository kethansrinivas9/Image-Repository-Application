var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kethan",
  multipleStatements: true,
  charset : 'utf8'
});


module.exports = {
  connect: function(){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  },

  createImageRepository: function(){
    con.query("CREATE DATABASE IF NOT EXISTS image_repository CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;", function (err, result) {
        if (err) throw err;
    });
  },

  createImageTable: function(){
      var sql = "USE image_repository;CREATE TABLE IF NOT EXISTS image_db (name VARCHAR(255), image LONGBLOB);";
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
  },

  saveImagetoTable: function(file){
      console.log("saving the image to table...")

      fs.readFile(file.path, function(err, data) {
        if (err) throw err;

        var blob_details = {
            name: file.name,
            image: data
        };
        // insert the images into the datbase in blob format
        con.query('INSERT INTO image_repository.image_db SET ?', blob_details, function(err,
            result) {
            console.log(result);
        });
      });
  },

  getAllImages: function(callback){
    var sql = "SELECT image from image_repository.image_db";
    con.query(sql, function(err, result){
      if (err) throw err;
      // send the result to the invoker via callback
      callback(result);
    });
  }
}
