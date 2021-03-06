// Generated by CoffeeScript 1.6.1
(function() {
  var fromFile, fs, parse, render, tumble;

  tumble = require('./lexer').parse;

  parse = require('./parser');

  fs = require('fs');

  render = function(str, options, callback) {
    try {
      return callback(null, parse(tumble(str), options));
    } catch (err) {
      return callback(err, null);
    }
  };

  fromFile = function(path, options, callback) {
    return fs.readFile(path, 'utf8', function(err, str) {
      if (callback) {
        if (err) {
          return callback(err);
        }
        return callback(null, render(str, options, callback));
      }
      if (err) {
        throw err;
      }
    });
  };

  fromFile.render = render;

  module.exports = fromFile;

}).call(this);
