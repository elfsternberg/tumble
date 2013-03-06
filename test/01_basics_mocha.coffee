chai = require 'chai'
assert = chai.assert
expect = chai.expect
should = chai.should()

tumbl = require 'lib/tumble'

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



describe "Foobar", ->
    describe "#sayHello()", ->
        it "should work with assert", ->
            assert.equal foobar.sayHello(), "funky chicken!"

        it "should work with expect", ->
            expect(foobar.sayHello()).to.equal "funky chicken!"

        it "should work with should", ->
            foobar.sayHello().should.equal "funky chicken!"
