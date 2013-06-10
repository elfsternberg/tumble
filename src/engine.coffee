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
        return callback(err) if err
        render(str, options, callback)

fromFile.render = render

exports = fromFile
