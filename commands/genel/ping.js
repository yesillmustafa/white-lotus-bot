const ms = require('ms');

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: 'ping',
    description: 'Botunuzun pingini gösterir.',
    category: 'genel',

    execute(client, message) {
        message.channel.send(`Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago **${client.ws.ping}ms** 🛰️`);
    },
};