_ = require 'underscore'
util = require 'util'

class Contexter

    constructor: (@content) ->
        @stack = [@content]
        @templates = {}
        @depth = 0

    has_any: (name) ->
        _.find this.stack, (o) -> _.has(o, name)

    has_any_one: (name) ->
        p = @has_any(name)
        if p then p[name] else null

    has: (name) ->
        if @stack[0][name]? then @stack[0][name] else null

    get: (name, alt = '') ->
        p = @has_any_one(name)
        if p and (_.isString(p) or _.isNumber(p)) then p else alt

    once: (obj, cb) ->
        @stack.unshift obj
        r = cb this
        @stack.shift()
        r

    if: (name, cb) ->
        p = @has_any_one(name)
        if p then cb(this) else ''

    block: (name, cb) ->
        p = @has_any_one(name)
        if p and _.isObject(p) then @once(p, cb) else ''

    many: (name, cb) ->
        ps = @has(name)
        if not (ps and _.isArray(ps))
            return ""
        (_.map ps, (p) => @once(p, cb)).join('')

    templatize: (name, cb) ->
        @templates[name] = cb
        ""

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
