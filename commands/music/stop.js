module.exports = {
    name: 'çık',
    aliases: ['dc', 'git', 'disconnect', 'stop'],
    utilisation: 'stop',
    category: 'music',
    description: 'Bot ses kanalından ayrılır.',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return

        queue.destroy();

        message.channel.send("Bay bay umarım eğlenmişsinizdir.");
    },
};