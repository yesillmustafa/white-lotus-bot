module.exports = {
    name: 'önceki',
    aliases: ['previous', 'öncekiniçal', 'back'],
    utilisation: 'önceki',
    category: 'music',
    description: 'Listede dinlediğiniz bi önceki şarkıyı çalar.',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        if (!queue.previousTracks[1]) return message.channel.send('❌ Daha Önce Çalınan şarkı yok.');

        await queue.back();

        message.channel.send(`✅ Önceki Şarkı Çalıyor. `);
    },
};