.PHONY: lib test library docs

COFFEE= ./node_modules/.bin/coffee
PEGJS= ./node_modules/.bin/pegjs
DOCCO= ./node_modules/.bin/docco
MOCHA= ./node_modules/.bin/mocha

cof_sources:= $(wildcard src/*.coffee)
cof_objects:= $(subst src/, lib/, $(cof_sources:%.coffee=%.js)) 

peg_sources:= $(wildcard src/*.peg)
peg_objects:= $(subst src/, lib/, $(peg_sources:%.peg=%.js)) 

library: $(cof_objects) $(peg_objects)

default: build

build: $(lib_objects) 

lib:
	mkdir -p lib

$(cof_objects): $(cof_sources)
	@mkdir -p $(@D)
	$(foreach source, $(cof_sources), $(COFFEE) -o $(@D) -c $(source); )

$(peg_objects): $(peg_sources)
	@mkdir -p $(@D)
	$(PEGJS) $< $@

docs:
	$(DOCCO) $(cof_sources)

echo:
	echo $(cof_sources)
	echo $(cof_objects)

test: test/[0-9]*_mocha.coffee lib/tumble.js lib/parser.js
	./node_modules/.bin/mocha -R tap -C --compilers coffee:coffee-script -u tdd $<


clean:
	rm -fr lib
