'use strict';

const MongoConfig = require('../config/mongo_config.js');
var client = new MongoConfig();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

class Multimedia{
  constructor(nombre_multimedia, nombre_archivo){
    this.multimedia = {
      _id: new ObjectID(),
      nombre_multimedia: nombre_multimedia,
      creado: new Date(),
      actualizado: null,
      nombre_archivo: nombre_archivo,
      status: 'A',
      comentarios: []
    }
  }

  async create(id){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').update({ _id: ObjectID(id) }, { $push: { multimedia: this.multimedia } }, (error, results) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

  async readByID(id){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').findOne({_id: ObjectID(id)}, (error, results) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

  async addComment(user, multimedia_id){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').findOne({})
    });
  }

}

module.exports = Multimedia;
