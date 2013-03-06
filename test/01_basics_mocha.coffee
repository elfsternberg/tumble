chai = require 'chai'
assert = chai.assert
expect = chai.expect
should = chai.should()

Tumbler = require('../lib/tumble')

tumbl = new Tumbler()

test_data = [
    {
        'input': '',
        'output': ''
    }
    {
        'input': '<html>',
        'output': '<html>',
    }
    {
        'input': '<h1>{name}</h1>'
        'output': '<h1>Elf Sternberg</h1>'
        'data': {'name': 'Elf Sternberg'}
    }

    {
        'input': '<h1>{title} {name}</h1>'
        'output': '<h1>Mr. Elf Sternberg</h1>'
        'data': {'name': 'Elf Sternberg', 'title': 'Mr.'}
    }

    {
        'input': '<ul>{block:Stories}{Title}{/block:Stories}'
        'output': '<ul>AAABBB</ul>'
        'data': {'stories': [{'title': 'AAA'}, {'title': 'BBB'}]}
    }]


describe "Basic Functionality", ->
    for data in test_data
        it "should work with #{data.description}", ->
            tumbl.parse(data.input)(data.data).should.equal data.output
