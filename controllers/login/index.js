'use strict';

var Usuario = require('../../models/usuario.js');
var Encrypt = require('../../utils/encrypt.js');

module.exports = function(router){

  router.post('/', function (req, res) {
    var response;
    var usuario = new Usuario();
    usuario.readByName(req.body.nombre_usuario)
    .then(data => {
      if(data){
        //var encrypt = new Encrypt(req.body.password);
        //if(encrypt.compareHash(data.salt, data.password))
        if(data.password === req.body.password){
          usuario.update_last_connection(data._id);
          res.send(response = {state: true, data: data});
        }
      }
      res.send(response = {state: false, data: null});
    });
  });
}
