import rot13 from './rot13.mjs'

class config_t {
    appid = '1117616240517713973'
    token = "@G8kAmLkA]<#@7HkAmVk@m^&@j!:?EJ,@!`B)hWf6XI4DXFLBjGAkUT:`5VmJb%'F8]ihX5'"
    intents = 33281
    perms = 3072
    invite = `https://discord.com/api/oauth2/authorize?client_id=1117616240517713973&permissions=3072&scope=bot`
    db = './db.json'

    constructor () {
        this.token = new rot13 ({ text: this.token })
            .decrypt ()
            .text
    }
}

let config = new config_t
export default config

import test from './test.mjs'
test (function () {
    return config
})
