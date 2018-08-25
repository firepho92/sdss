'use strict';

var Multimedia = require('../../models/multimedia.js');
var Usuario = require('../../models/usuario.js');
var FileStorage = require('../../utils/fileStorage.js');

module.exports = function(router){

  router.get('/', function(req, res){
    var response;
    var multimedia = new Multimedia();
    multimedia.readByID(req.query.id)
    .then(data => {
      if(data)
        res.send(response = {state: true, data: data});
      res.send(response = {state: false, data: data});
    })
    .catch(error => {
      res.status(500).json({error: error});
    });
  });

  router.post('/', function (req, res) {
    var response;
    var fileStorage = new FileStorage(req);
    fileStorage.store()
    .then(file_name => {
      var multimedia = new Multimedia(req.body.nombre_multimedia, file_name);
      multimedia.create(req.body.id)
      .then(data => {
        if(data)
          res.send(response = {state: true, data: data});
        res.send(response = {state: false, data: data});
      });
    });
  });

  router.put('/', function(req, res) {
    var response;
    var fileStorage = new FileStorage(req);
    fileStorage.store()
    .then(file_name => {
      req.body.usuario.multimedia.map(file => {
        if(file._id === req.body.updatingFileID)
          file.nombre_archivo = file_name;
      });
      var usuario = new Usuario();
      usuario.update(req.body.usuario)
      .then(data => {
        if(data)
          res.send(response = {state: true, data: data});
        res.send(response = {state: false, data: data});
      });
    });
  });

  router.get('/form', function(req, res){
    var response = '<html><body><form action="/multimedia" enctype="multipart/form-data" method="post"><input type="text" name="id"><input type="text" name="nombre_multimedia"><input type="text" name="tipo"><input type="file" name="file"><input type="submit" value="submit"></form></body></html>';
    res.send(response);
  });

}
