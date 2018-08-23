'use strict';
var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient();

class MongoConfig{
  constructor(){
    this.url = 'mongodb://localhost:27017';
    this.dbName = 'sdss';
  }

  async getConnection(){
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (error, database) => {
        if(error) throw error;
        console.log('Connection established');
        resolve(database);
      });
    });
  }
}

module.exports = MongoConfig;
