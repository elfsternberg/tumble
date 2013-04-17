chai = require 'chai'
assert = chai.assert
expect = chai.expect
should = chai.should()

tumble = require('../lib/tumble').parse;

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
        'input': '<ul>{if:title}{title}BBB{/if:title}</ul>'
        'output': '<ul>AAABBB</ul>'
        'data': {'title': 'AAA'}
        'description': "a conditional block"
    }

    {
        'input': '<ul>{if:title}{title}BBB{/if:title}</ul>'
        'output': '<ul></ul>'
        'data': {'title': ''}
        'description': "a conditional block with no input"
    }


    {
        'input': '<ul>{block:stories}{title}{/block:stories}</ul>'
        'output': '<ul></ul>'
        'data': {'stories': {'title': ''}}
        'description': "a descendent block"
    }


    {
        'input': '<ul>{block:stories}{title}BBB{/block:stories}</ul>'
        'output': '<ul>AAABBB</ul>'
        'data': {'stories': {'title': 'AAA'}}
        'description': "a descendent block 2"
    }

    {
        'input': '<ul>{many:stories}{title}{/many:stories}</ul>'
        'output': '<ul></ul>'
        'data': {'stories': [{'title': ''}]}
        'description': "an iterative block"
    }


    {
        'input': '<ul>{many:stories}{title}BBB{/many:stories}</ul>'
        'output': '<ul>AAABBBCCCBBB</ul>'
        'data': {'stories': [{'title': 'AAA'}, {'title': 'CCC'}]},
        'description': "an iterative block 2"
    }

    {
        'input': '<ul>{author}{many:stories}{title}BBB{author}{/many:stories}</ul>'
        'output': '<ul>DDDAAABBBDDDCCCBBBDDD</ul>'
        'data': {'author': 'DDD', 'stories': [{'title': 'AAA'}, {'title': 'CCC'}]},
        'description': "an iterative block with ascent"
    }

]


describe "Basic Functionality", ->
    for data in test_data
        do (data) ->
            it "should work with #{data.description}", ->
                r = tumble(data.input)(data.data)
                r.should.equal data.output
