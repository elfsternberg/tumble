tumble = require('./parser')
util = require('util')

module.exports = (template) ->

    ast = tumble.parse(template)

    # Using the AST, return a function that will render each component
    # of the AST out, as long as the data provided to the AST makes
    # sens.
    #

    (content) ->
        subtypes = (name) ->
            return 'cond'

        handler = (obj) ->
            isLegal = (name) -> true
            {
                'text': () ->
                    obj.content
                'variable': () ->
                    return '' if not (isLegal(obj.content) and content.hasOwnProperty(obj.content))
                    content[obj.content]

                'block': () ->
                    return '' if not (isLegal(obj.content) and content.hasOwnProperty(obj.content))
                    {
                        'cond': () -> if obj.content then handler(obj.content) else ''
                        'loop': () -> (handler(o) for o in obj.content)
                    }[subtypes(obj.name)]()
            }[obj.type]()

        (handler(i) for i in ast).join("")
