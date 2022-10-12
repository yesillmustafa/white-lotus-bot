const { QueryType } = require('discord-player');

module.exports = {
    name: 'oynat',
    aliases: ['p', 'çal', 'play'],
    utilisation: 'çal [song name/URL]',
    category: 'music',
    description: 'Şarkı çalmanızı sağlar.',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.reply("Şarkı oynatabilmek için lütfen bir şarkı aratınız veya bir url giriniz.");

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply("❌ Aradığınız şarkı bulunamadı.");

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.reply("❌ Bulunduğunuz kanala katılamıyorum.");
        }

        // await message.reply({ embeds: [{ description: `${res.playlist ? 'Çalma Listeniz' : 'Şarkınız'} Yükleniyor... 🎧` }] });

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};