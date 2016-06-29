lexer = require './lexer'
parse = require './parser'
engine = require './engine'

module.exports = {
    tumble: lexer.parse,
    parse: parse,
    render: (str, data) -> parse(lexer.parse(str), data)
    engine: engine
}