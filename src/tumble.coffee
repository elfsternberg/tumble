#    _   _       _               _  _____           _    _
#   /_\ | |__ __| |_ _ _ __ _ __| ||_   _|  _ _ __ | |__| |_ _
#  / _ \| '_ (_-<  _| '_/ _` / _|  _|| || || | '  \| '_ \ | '_|
# /_/ \_\_.__/__/\__|_| \__,_\__|\__||_| \_,_|_|_|_|_.__/_|_|
#

# Built on top of the basic parser-combinator for Coffeescript, this
# defines a parser for the Tumblr engine, assuming the following:

ReParse = require('reparse-coffeescript/lib/reparse').ReParse

class AbstractTumbler extends ReParse

module.exports = class extends AbstractTumbler
