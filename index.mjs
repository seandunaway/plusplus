import db_t from './db.mjs'
import discord from './discord.mjs'

let db = new db_t ()
db .read_file ()
setInterval (function () {
    db .write_file ()
}, 1 * 60 * 1000)

// ++
discord .on ('messageCreate', function (message) {
    let match = message.content.match (/^(?<term>[^\s\+]+)\+\+$/)
    if (! match) return

    db .inc (match.groups.term)
})

// --
discord .on ('messageCreate', function (message) {
    let match = message.content.match (/^(?<term>[^\s\+]+)--$/)
    if (! match) return

    db .dec (match.groups.term)
})

// ?
discord .on ('messageCreate', function (message) {
    let match = message.content.match (/^(?<term>[^\s\+]+)\?$/)
    if (! match) return

    if (typeof db.data[match.groups.term] === 'undefined')
        return

    message.reply (db.data[match.groups.term] .toString ())
})

// ++?
discord .on ('messageCreate', function (message) {
    let match = message.content.match (/^\+\+\?$/)
    if (! match) return

    db.sort_descending ()
    let sliced = db.sliced ()

    let descending = ":thumbsup:\n"
    for (let [key, value] of sliced) {
        descending += `${key}: ${value}\n`
    }

    message.reply (descending)
})

// --?
discord .on ('messageCreate', function (message) {
    let match = message.content.match (/^--\?$/)
    if (! match) return

    db.sort_ascending ()
    let sliced = db.sliced ()

    let ascending = ":thumbsdown:\n"
    for (let [key, value] of sliced) {
        ascending += `${key}: ${value}\n`
    }

    message.reply (ascending)
})
