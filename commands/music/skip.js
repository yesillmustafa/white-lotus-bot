module.exports = {
    name: 'atla',
    aliases: ['sk', 'geç', 'skip'],
    utilisation: 'atla',
    category: 'music',
    description: 'Çalan şarkıyı atlar.',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        const success = queue.skip();

        return message.channel.send(success ? `✅ **Şarkı Atlandı.** ` : `❌ Bir Şeyler Ters Gitti.`);
    },
};