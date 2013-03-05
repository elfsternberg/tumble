.PHONY: app libs


app_sources:= $(wildcard src/*/*.coffee)
app_objects:= $(subst src/, app/, $(app_sources:%.coffee=%.js))

libs= $(shell cd src && find . -type f -name '*.js')

home_sources = src/index.haml
home_objects = app/index.html

default: build

build: app bootstrap $(app_objects) $(home_objects) libs

app:
	mkdir -p $@

$(app_objects): app/%.js: src/%.coffee
	coffee -o $(@D) -c $<

libs:
	cd src && tar cf - $(libs) | ( cd ../app; tar xvf - )

$(home_objects): app/%.html: src/%.haml
	haml --unix-newlines --no-escape-attrs --double-quote-attributes $< > $@

bootstrap: app
	cp bootstrap-extras/variables.less vendor/bootstrap/less
	cd vendor/bootstrap && make build
	cd vendor/bootstrap/bootstrap && tar cf - .| (cd ../../../app && tar xvf - )

clean:
	rm -fr app
	cd vendor/bootstrap && git reset --hard HEAD