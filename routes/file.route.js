const express = require('express');
const app = express();
const fileRoutes = express.Router();

let Files = require('../models/file');

fileRoutes.post('/file', function(req, res, next) {
  if(!req.body.bytes || !req.body.contentType)
  {
    res.status(400).send("Either bytes or contentType was not specified");
  }
  let file = new Files();
  file.bytes = req.body.bytes;
  file.contentType = req.body.contentType;

  file.save(function(err, fileRes){
    if (err) return next(err);
    if(fileRes){
      res.json(fileRes._id);
    }
  });
});

fileRoutes.get('/file/:id', (req, res, next) => {
  //Create file from byte array and serve
  Files.findById(req.params.id, (err,fileRes) => {
    if (err) return next(err);
    if(fileRes){
      let doc = fileRes.toObject();
      let buffer = Buffer.from(doc.bytes.substring(doc.bytes.indexOf(',')+1), 'base64');
      res.writeHead(200, {
        'Content-Type': doc.contentType,
        'Content-Length': buffer.length
      });
      res.end(buffer);
    }
  });
});

fileRoutes.delete('/file/:id', (req, res, next) => {
  Files.findByIdAndRemove(req.params.id, (err,fileRes) => {
    if (err)
      return false;
    if(fileRes)
      return true;
    return false;
  });
});

module.exports = fileRoutes;


// TODO: test delete route
