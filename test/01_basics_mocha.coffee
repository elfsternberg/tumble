chai = require 'chai'
assert = chai.assert
expect = chai.expect
should = chai.should()

tumble = require('../lib/tumble')

test_data = [
    {
        'input': '',
        'output': '',
        'description': "no input"
    }
    {
        'input': '<html>',
        'output': '<html>',
        'description': "just text"
    }
    {
        'input': '<h1>{name}</h1>'
        'output': '<h1>Elf Sternberg</h1>'
        'data': {'name': 'Elf Sternberg'},
        'description': "a simple substitution"
    }

    {
        'input': '<h1>{title} {name}</h1>'
        'output': '<h1>Mr. Elf Sternberg</h1>'
        'data': {'name': 'Elf Sternberg', 'title': 'Mr.'},
        'description': "two simple substitutions"
    }

    {
        'input': '<ul>{block:Stories}{Title}{/block:Stories}'
        'output': '<ul>AAABBB</ul>'
        'data': {'stories': {'title': 'AAA'}},
        'description': "a conditional block"
    }]


describe "Basic Functionality", ->
    for data in test_data
        do (data) ->
            it "should work with #{data.description}", ->
                r = tumble(data.input)(data.data)
                r.should.equal data.output
