tumble = require('./lexer').parse;
parse = require('./parser');
fs     = require 'fs'

render = (str, options, callback) ->
    try
        callback(null, parse(tumble(str), options))
    catch err
        callback(err, null)

fromFile = (path, options, callback) ->
    fs.readFile path, 'utf8', (err, str) ->
        if callback
            return callback(err) if err
            console.log(str, options);
            return callback(null, render(str, options, callback))
        throw err if err

fromFile.render = render

module.exports = fromFile
