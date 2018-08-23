'use strict';
var crypto = require('crypto');

class Encrypt {
  constructor(str){
    this.str = str;
  }

  hash(){
    var response;
    var salt = crypto.randomBytes(128).toString('base64');
    var hash = crypto.pbkdf2Sync(this.str, salt, 10000, 512, 'sha512');
    return response = {hash: hash.toString('hex'), salt: salt};
  }

  compareHash(salt, hashedStr){
    var hash = crypto.pbkdf2Sync(this.str, salt, 10000, 512, 'sha512');
    hash.toString('hex') === hashedStr ? true : false;
  }
}

module.exports = Encrypt;
