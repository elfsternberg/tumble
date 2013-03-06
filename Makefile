.PHONY: lib test

lib_sources:= $(wildcard src/*.coffee)
lib_objects:= $(subst src/, lib/, $(lib_sources:%.coffee=%.js))

default: build

build: $(lib_objects)

$(lib_objects): lib/%.js: src/%.coffee
	@mkdir -p $(@D)
	coffee -o $(@D) -c $<

test: test/[0-9]*_mocha.coffee
	./node_modules/.bin/mocha -C --compilers coffee:coffee-script -u tdd $<

clean:
	rm -fr lib
