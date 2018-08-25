'use strict';

const MongoConfig = require('../config/mongo_config.js');
var client = new MongoConfig();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

class Usuario{
  constructor(nombre_usuario, nombre, password, salt){
    this.usuario = {
      nombre_usuario: nombre_usuario,
      nombre: nombre,
      password: password,
      salt: salt,
      imagen_perfil: 'ivan.jpg',
      multimedia: [],
      ultima_conexion: null
    }
  }

  async create(){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').insertOne(this.usuario, (error, results) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

  async read(){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').find({}).toArray((error, results) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

  async update(usuario){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').updateOne({_id: usuario._id}, {$set: {usuario}}, (error, results) => {
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

  async readByName(nombre_usuario){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').findOne({nombre_usuario: nombre_usuario}, (error, results) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

  async update_last_connection(id){
    var connection = await client.getConnection();
    return new Promise((resolve, reject) => {
      var db = connection.db(client.dbName);
      db.collection('usuarios').updateOne({_id: id}, {$set: {ultima_conexion: new Date()}}, (error, results) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }
}

module.exports = Usuario;
