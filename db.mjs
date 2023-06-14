import config from './config.mjs'

export default class db_t {
    file = config.db
    data = {}
    slice = 10

    constructor (options) {
        Object .assign (this, options)
    }

    get json () {
        let json = JSON .stringify (this.data)
        return json
    }

    set json (json) {
        let object = JSON .parse (json)
        this.data = object
    }

    inc (term) {
        if (typeof this.data[term] === 'undefined')
            this .reset (term)
        this.data[term] ++
        return this
    }

    dec (term) {
        if (typeof this.data[term] === 'undefined')
            this .reset (term)
        this.data[term] --
        return this
    }

    reset (term) {
        let sanitized = this.sanitize (term)
        if (! sanitized)
            return

        this.data[sanitized] = 0
        return this
    }

    count (term) {
        if (typeof this.data[term] === 'undefined')
            return false
        return this.data[term]
    }

    sanitize (term) {
        let sanitized = term .replaceAll (/(\+|-|\*)/g, '')
        return sanitized
    }

    sort (fn) {
        let entries = Object .entries (this.data)
        let sorted = entries.sort (fn)
        let from_entries = Object .fromEntries (sorted)
        this.data = from_entries
        return this
    }

    sort_ascending () {
        this.sort (function (a, b) { return a[1] - b[1] })
        return this
    }

    sort_descending () {
        this.sort (function (a, b) { return b[1] - a[1] })
        return this
    }

    sliced () {
        let entries = Object .entries (this.data)
        let sliced = entries .slice (0, this.slice)
        return sliced
    }

    purge () {
        this.data = {}
        this.write_file ()
    }

    log () {
        console .log (this.data)
        return this
    }

    async read_file () {
        let { readFile } = await import ('node:fs/promises')
        let file_contents = await readFile (this.file, { encoding: 'utf8' })
        if (! file_contents)
            file_contents = '{}'
        this.json = file_contents
        return this
    }

    async write_file () {
        let { writeFile } = await import ('node:fs/promises')
        await writeFile (this.file, this.json)
        return this
    }
}

import test from './test.mjs'
test (function () {
    let db = new db_t ()
        .inc ('apple')
        .dec ('banana')
        .reset ('orange')
    db.json = db.json
    return db
})
test (function () {
    let db = new db_t ({ data: { x: 1, y: 3, z: 2, }})
        .sort_ascending ()
        .log ()
        .sort_descending ()
        .log ()
})
