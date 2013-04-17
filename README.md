# Tumble - Generalized, hyper-simple templating engine

## Purpose

I like Tumblr's templating system, with its simplicity and brevity.
The idea that, for small projects, one should embed everything in a
single page and switch sections on and off as needed appeals to me, so
I decided to write my own implementation of the Tumblr parser.

Tumble is an implementation of the Tumblr parser/compiler/renderer,
with keyword substitutions suitable to my needs on my story website.
The idea is that the database side will produce an object consisting
of variable, object, and array substitutions, and that the
corresponding template will describe how to unpack and illustrate that
object.

## Usage

There are five kinds of objects in my templating language: plain text,
variables, "if", "block", and "many" sections.

### Plain Text

Plain text is just that, the text of your template without any
substitutions.

### Variable

Tumble tags are contained in { } entries.  Sadly, there's no current
way to escape this.

A variable is a Tumble tag without a colon in it. It refers to a valid
name in the current context scope (more on that below) that is either
a string or a number.

### If

An "if:<name>" section can contain other objects, but the entirety of
the section is only rendered if the current context scope contains the
current name, and the value associated with that name is "true" in a
boolean context.  You might use to show someone's name, if the name
field is populated, and show nothing if it isn't.

If your datasource returns:

    obj = { "name": "Mr. Smith"}

Then your template would use:

    {if:name}Hello {name}!{/if:name}

### Block

A "block:<name>" section can contain other objects, but the entirety
of the section is only rendered if the current context scope contains
the current name, a value exists for that name, and the value is an
object itself.  When the block is entered, the object referred to
becomes the top of the current context scope.  You might use it to
render "next/prev" blocks in a webcomic.

If your datasource returns:

    obj = { "next": {"title": "The Next Story"}, 
            "prev": {"title": "The Previous Story"}}

Then your template would use:

    {block:next}The next story is entitled {title}{/block:next}
    {block:prev}The next story is entitled {title}{/block:prev}

### Many

A "many:<name>" section can contain other objects, but the entirety of
the section is only rendered if the current context scope contains the
current name, a value exists for that name, and the value is an array
that itself contains objects.  When the block is entered, each object
in the named array is serially made the top object of the current
context scope, the section is rendered, and the object is popped off
the context scope stack once more.  You might use it to render a
series of titles in a series:

If your datasource returns:

    obj = { 
        "series": 
            [ {"title": "A Story"}, 
              {"title": "A Second Story"}, 
              {"title": "A Third Story"}
            ]
        }

Then you could render a list of your stories this way:

    {if:series}    
    <h1>Table of Contents:</h1>
    <ul>
        {many:series}<li>{title}</li>{/many:series}
    </ul>
    {/if:series}
        

### The current context scope

The Tumble parser is intended to render a website for series and
stories.  Both of which have titles, so you might have an object that
says:

    obj = {
        title: "An awesome series",
        author: "Twilight Sparkle",
        stories: [{title: "The first awesome story"},
                  {title: "The second awesome story"}]
        }

In both "block" and "many", the current context descends into these
objects in a deterministic way.  While inside a block or many, when
searching for a variable substitution (and *only* variable
substitutions), the context handler will scan upwards from the current
context scope to the root to find a possible substitution.

For example

    <h1>{title}</h1>
    {if:stories}    
    <p>Table of Contents:</p>
    <ul>
        {many:stories}<li>{title} by {author}</li>{/many:stories}
    </ul>
    {/if:stories}

The first "title" will be the series title, but the titles in the
"many" block will be story titles, in order.  Because each story does
not have an "author" block, the context will scan up to the parent
scope and find the author's name.

See the unit tests for more examples.  Run them to see that this
actually works as described.

## Requirements

nodejs & npm.  

Underscore is a dependency.

PegJS is a required build tool.  Mocha & Chai are used for testing.

All of these are specified in the package.json file.

## LICENSE AND COPYRIGHT NOTICE: NO WARRANTY GRANTED OR IMPLIED

Copyright (c) 2012 Elf M. Sternberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

	- Elf M. Sternberg <elf@pendorwright.com>





