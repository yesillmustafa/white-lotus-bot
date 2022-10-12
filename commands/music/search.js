const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
        name: 'ara',
        aliases: ['sh', 'search'],
        utilisation: 'ara [song name]',
        category: 'music',
        description: 'Youtube`da şarkı aramanızı sağlar.',
        voiceChannel: true,

        async execute(client, message, args) {
            if (!args[0]) return message.channel.send("❌ Lütfen geçerli bir arama girin.")

            const res = await player.search(args.join(' '), {
                requestedBy: message.member,
                searchEngine: QueryType.AUTO
            });

            if (!res || !res.tracks.length) return message.channel.send("❌ Böyle bir sonuç bulunamadı.")

            const queue = await player.createQueue(message.guild, {
                metadata: message.channel
            });

            const embed = new MessageEmbed();

            embed.setColor('WHITE');
            embed.setAuthor(`**${args.join(' ')}** için sonuçlar:`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

            const maxTracks = res.tracks.slice(0, 10);

            embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n **1** ile **${maxTracks.length}** arasından seçim yapın. Yada **iptal** Yazın.⬇️`);

        embed.setTimestamp();
        embed.setFooter('Music comes first ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'iptal') return message.channel.send(`✅ Arama iptal edildi.`);

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`❌ Geçersiz Cevap. Lütfen **1** ile **${maxTracks.length}** arasında bir cevap verin yada **iptal** yazın..`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.reply(`❌ Ses Kanalına Katılamıyorum.`);
            }

            // await message.channel.send(`Loading your search... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        // collector.on('end', (msg, reason) => {
        //     if (reason === 'time') return message.reply({ embeds: [{ description: `Arama Zaman Aşımına Uğradı Lütfen Tekrar Deneyin.`, color:"#ff0000"  }] });
        // });
    },
};