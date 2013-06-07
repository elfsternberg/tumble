_ = require 'underscore'
util = require 'util'

class Contexter

    constructor: (@content) ->
        @stack = [@content]
        @templates = {}
        @depth = 0

    has_any: (name) ->
        # Scan the parse stack from more recent to most distant,
        # return the reference that contains this name.
        _.find @stack, (o) -> _.has(o, name)

    has_any_one: (name) ->
        # Returns the most recent key seen on this stack, if any.
        p = @has_any(name)
        if p then p[name] else null

    has: (name) ->
        # Returns references ONLY from the most recent context.
        if @stack[0][name]? then @stack[0][name] else null

    get: (name, alt = '') ->
        # Scalars only
        p = @has_any_one(name)
        return p if p and (_.isString(p) or _.isNumber(p))
        return @render(p)

    once: (obj, cb) ->
        # Create a new context, execute the block associated with that
        # context, pop the context, and return the production.
        @stack.unshift obj
        r = cb @
        @stack.shift()
        r

    if: (name, cb) ->
        # Execute and return this specifiecd block if and only if the
        # requested context is valid.
        p = @has_any_one(name)
        if p then cb(@) else ''

    block: (name, cb) ->
        # Execute and return this specified block if and only if the
        # requested context is valid and entrant.
        p = @has_any_one(name)
        if p and _.isObject(p) then @once(p, cb) else ''

    many: (name, cb) ->
        # Execute and return this specified block for each element of
        # the specified context if and only if the requested context
        # is valid and is iterable.
        ps = @has(name)
        if not (ps and _.isArray(ps))
            return ""
        (_.map ps, (p) => @once(p, cb)).join('')

    template: (name, cb) ->
        # Store the specified block under a name.  No production.
        @templates[name] = cb
        return ""

    render: (name) ->
        if @templates[name]? and _.isfunction(@templates[name]) then @templates[name](@) else ""


module.exports = (ast, data) ->
    context = new Contexter(data)

    cmd = (o) ->
        switch o.unit
            when 'variable' then  (context) -> context.get(o.name)
            when 'text'     then  (context) -> o.content
            when 'block'    then  (context) -> context[o.type] o.name, (context) ->
                (cmd(p)(context) for p in o.content).join("")

    (cmd(o)(context) for o in ast.content).join("")
