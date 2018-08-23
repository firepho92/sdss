'use strict';

var Formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var ObjectID = require('mongodb').ObjectID;

class FileStorage{
  constructor(form){
    this.form = form;
  }

  async store(){
    return new Promise((resolve, reject) => {
      var file_name = new ObjectID().toString();
      var tmp_path = this.form.files.file.path;
      var file_ext = this.form.files.file.name.split('.').pop();
      var formidable = new Formidable.IncomingForm();
      var new_path = path.join(process.env.PWD, '/public/uploads/', file_name + '.' + file_ext);
      fs.readFile(tmp_path, (error, data) => {
        fs.writeFile(new_path, data, (error) => {
          fs.unlink(tmp_path, (error) => {
            if(error) throw error;
            resolve(new_path.split('/').pop());
          });
        });
      });
    });
  }
}

module.exports = FileStorage;
