module.exports = {
    name: 'durdur',
    aliases: ['pause', 'duraklat', 'dur'],
    utilisation: 'durdur',
    category: 'music',
    description: 'Çalan şarkıyı duraklatır.',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        const success = queue.setPaused(true);

        return message.channel.send(success ? `✅ Şarkı durduruldu. ` : `Bir Şeyler Ters Gitti. ❌`);
    },
};