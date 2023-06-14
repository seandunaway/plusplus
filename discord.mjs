import config from './config.mjs'
import { Client } from 'discord.js'

let discord = new Client ({ intents: config.intents })

discord .on ('ready', function (client) {
    client.user.setPresence ({
        activities: [{
            type: 3,
            name: '++ and --',
        }],
    })

    console .log (new Date (), client.user.tag, 'ready!')
})

discord .login (config.token)

export default discord
