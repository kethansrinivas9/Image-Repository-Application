const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
var mysql = require('mysql');
var cors = require('cors');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kethan"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("CREATE DATABASE IF NOT EXISTS Image_Repository", function (err, result) {
      if (err) throw err;
      console.log("Database created");
  });
});

app.post('/imageUpload', multipartMiddleware, (req,res) => {
    console.log("request came here...");
    console.log(req.body);
    console.log(req.files);
    res.send(200);
})

app.listen('3002', () => {
    console.log('Server started on port 3002');
});
