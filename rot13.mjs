export default class rot13_t {
    text
    secret = -13

    constructor (options) {
        Object .assign (this, options)
    }

    encrypt () {
        this.secret = -Math.abs (this.secret)
        this.rotate ()
        return this
    }

    decrypt () {
        this.secret = Math.abs (this.secret)
        this.rotate ()
        return this
    }

    rotate () {
        let rotated = ''
        for (let char of this.text) {
            let char_code = char .charCodeAt (0)
            let char_code_rotated = char_code + this.secret
            let char_rotated = String .fromCharCode (char_code_rotated)
            rotated += char_rotated
        }
        this.text = rotated
        this.secret *= -1
        return this
    }
}

import test from './test.mjs'
test (function () {
    let rot13 = new rot13_t ({ text: 'hello world' })
        .encrypt ()
        .decrypt ()
        .rotate ()
        .rotate ()
    return rot13
})

if (typeof process !== 'undefined' && process.argv[2]) {
    console .log (new rot13_t ({ text: process.argv[2] }) .encrypt () . text)
}
