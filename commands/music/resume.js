module.exports = {
    name: 'devam',
    aliases: ['rs', 'resume'],
    utilisation: 'devam',
    category: 'music',
    description: 'Duraklattığınız şarkıyı devam ettirir.',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        const success = queue.setPaused(false);

        return message.channel.send(success ? `✅ Şarkı oynatılmaya devam ediyor.` : `Bir Şeyler Ters Gitti ❌`);
    },
};