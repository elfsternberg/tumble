chai = require 'chai'
assert = chai.assert
expect = chai.expect
should = chai.should()
util   = require 'util'
fs     = require 'fs'
path   = require 'path'

tumble = require('../lib/lexer').parse;
parse = require('../lib/parser');

test_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'))

describe "Basic Functionality", ->
    for data in test_data.data
        do (data) ->
            it "should work with #{data.description}", ->
                r = tumble(data.input)
                r = parse(r, data.data)
                r.should.equal data.output

describe "Check for recursion", ->
    data = {
            'input': '{block:a}{block:a}{block:a}{block:a}{block:a}{block:a}{block:a}{block:a}{block:a}{block:a}{block:a}{a}{/block:a}{/block:a}{/block:a}{/block:a}{/block:a}{/block:a}{/block:a}{/block:a}{/block:a}{/block:a}{/block:a}',
            'output': '',
            'data': {'a': {'a': {'a': {'a': {'a': {'a': {'a': {'a': {'a': {'a': {'a': {'a': 'b'}}}}}}}}}}}},
            'description': "descent error"
    }
    do (data) ->
        it "should catch an exception", ->
            try
                r = parse(tumble(data.input), data.data)
                assert.ok false, "It did not throw the exception"
            catch err
                assert.ok true, "Recursion depth exeception thrown."
