const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'ses',
    aliases: ['vol', 'volume', 'sesdüzeyi'],
    utilisation: `ses [1-${maxVol}]`,
    category: 'music',
    description: 'Ses düzeyini değiştirir.',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({ embeds: [{ description: `Şuanki Ses Düzeyi: ${queue.volume} 🔊\n*Değiştirmek için **1** ile **${maxVol}** arasında bir değer giriniz..*`, color: "WHITE" }] });

        if (queue.volume === vol) return message.channel.send({ embeds: [{ description: "Değiştirmek İstediğiniz ses düzeyi ile şuanki ses düzeyi aynı.", color: "WHITE" }] });

        if (vol < 0 || vol > maxVol) return message.channel.send({ embeds: [{ description: `Belirtilen değer geçerli değil. Lütfen **1** ile **${maxVol}** arasında bir değer girin.`, color: "WHITE" }] });

        const success = queue.setVolume(vol);

        return message.channel.send({ embeds: [{ description: success ? `Ses Düzeyi **${vol}**/**${maxVol}**% 🔊 olarak değiştirilmiştir.` : `Bir Şeyler Ters Gitti. ❌`, color: "WHITE" }] });
    },
};