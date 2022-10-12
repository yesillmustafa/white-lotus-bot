module.exports = {
    name: 'karıştır',
    aliases: ['sh', 'shuffle'],
    utilisation: 'karıştır',
    category: 'music',
    description: 'Çalma listenizi karıştırır.',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        if (!queue.tracks[0]) return message.channel.send("❌ Listede karıştırılcak şarkı yok.")

        await queue.shuffle();

        return message.channel.send(`✅ Çalma Kuyruğundaki **${queue.tracks.length}** şarkı karıştırıldı.`);
    },
};