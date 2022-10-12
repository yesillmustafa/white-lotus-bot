module.exports = {
    name: 'listeyitemizle',
    aliases: ['cq', 'sırayıtemizle', 'clearqueue'],
    utilisation: 'clearqueue',
    category: 'music',
    description: 'Çalma listenizi temizler.',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        if (!queue.tracks[0]) return message.channel.send("❌ Oynatma listesi boş.")

        await queue.clear();

        message.channel.send("✅ Sıra Temizlendi. ")
    },
};