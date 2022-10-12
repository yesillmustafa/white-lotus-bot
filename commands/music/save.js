module.exports = {
    name: 'kaydet',
    aliases: ['sv', 'save'],
    utilisation: 'kaydet',
    category: 'music',
    description: 'Çalan şarkıyı kaydetmenizi sağlar.',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        message.author.send(`**${queue.current.title}**\nBu Şarkıyı Kaydettin.`).then(() => {
            message.reply(`✅ Kaydettiğin şarkıyı sana dm den yolladım.`);
        }).catch(error => {
            message.reply(`❌ Size Özel Mesaj Gönderilmiyor`);
        });
    },
};