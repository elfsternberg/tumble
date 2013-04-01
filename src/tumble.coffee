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

        handler = (content, ast) ->

            isLegal = (name) -> true

            {
                'text': () ->
                    ast.text

                'variable': () ->
                    return '' if not (isLegal(ast.name) and content.hasOwnProperty(ast.name))
                    content[ast.name]

                'block': () ->
                    return '' if not (isLegal(ast.name) and content.hasOwnProperty(ast.name))
                    f = {
                        'cond': () -> handler(content[ast.name], ast.data)
                        'loop': () -> (handler(c, ast.data) for c in content[ast.name])
                    }[subtypes(ast.name)]
                    console.log("F:", f)
                    f()
            }[obj.type]()

        (handler(i) for i in ast).join("")
