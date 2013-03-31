.PHONY: lib test

lib_sources:= $(wildcard src/*.coffee)
lib_objects:= $(subst src/, lib/, $(lib_sources:%.coffee=%.js))

default: build

build: $(lib_objects) lib/parser.js

lib/parser.js: src/parser.peg
	./node_modules/.bin/pegjs src/parser.peg lib/parser.js

$(lib_objects): lib/%.js: src/%.coffee
	@mkdir -p $(@D)
	coffee -o $(@D) -c $<

test: test/[0-9]*_mocha.coffee lib/tumble.js lib/parser.js
	./node_modules/.bin/mocha -R tap -C --compilers coffee:coffee-script -u tdd $<


clean:
	rm -fr lib
