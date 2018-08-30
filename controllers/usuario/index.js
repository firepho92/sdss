'use strict';

var Usuario = require('../../models/usuario.js');
var Encrypt = require('../../utils/encrypt.js');

module.exports = function(router){

  router.get('/', function (req, res) {
    var response;
    var usuario = new Usuario();
    usuario.read()
    .then(data => {
      if(data)
        res.send(response = {state: true, data: data});
      res.send(response = {state: false, data: data});
    })
    .catch(error => {
      res.send(response = {state: false, data: error});
    });
  });

  router.get('/byID', function (req, res) {
    var response;
    var usuario = new Usuario();
    usuario.readByID(req.query.id)
    .then(data => {
      if(data)
        res.send(response = {state: true, data: data});
      res.send(response = {state: false, data: data});
    })
    .catch(error => {
      res.send(response = {state: false, error: error});
    });
  });

  router.post('/', function (req, res) {
    var response;
    //var encrypt = new Encrypt(req.body.password);
    //req.body.password = encrypt.hash().hash;
    //var salt = encrypt.hash().salt;
    var salt = null;//this is temporary
    var usuario = new Usuario(req.body.nombre_usuario, req.body.nombre, req.body.password, salt);
    usuario.create()
    .then(data => {
      if(data)
        res.send(response = {state: true, data: data});
      res.send(response = {state: false, data: data});
    })
    .catch(error => {
      res.send(response = {state: false, error: error});
    });
  });

  router.put('/comments', function (req, res) {
    var response;
    var usuario = new Usuario();
    usuario.updateComments(req.body.id, req.body.multimedia)
    .then(data => {
      if(data)
        res.send(response = {state: true, data: data});
      res.send(response = {state: false, data: null});
    })
    .catch(error => {
      res.send(response = {state: false, data: error});
    });
  });

  router.put('/', function (req, res) {
    var response;
    var usuario = new Usuario();
    usuario.update(req.body.usuario)
    .then(data => {
      if(data)
        res.send(response = {state: true, data: data});
      res.send(response = {state: false, data: null});
    })
    .catch(error => {
      console.log(error);
      res.send(response = {state: false, error: error});
    });
  });
}
