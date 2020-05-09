const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
var cors = require('cors');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var queries = require('./queries.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());

queries.connect();
queries.createImageRepository();
queries.createImageTable();
queries.tempInsert();

app.post('/imageUpload', multipartMiddleware, (req,res) => {
    console.log("request came here...");

    var files = req.files['files']
    for (i = 0; i < files.length; i++) {
      console.log("item" + i);
      console.log(files[i]);
      queries.saveImagetoTable(files[i]);
    }

    res.sendStatus(200);
});

app.listen('3002', () => {
    console.log('Server started on port 3002');
});
