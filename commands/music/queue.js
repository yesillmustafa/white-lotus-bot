const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'liste',
    aliases: ['q', 'sıra', 'kuyruk', 'queue'],
    utilisation: 'queue',
    category: 'music',
    description: 'Çalma listenizi gösterir.',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        if (!queue.tracks[0]) return message.channel.send(`❌ Sırada şarkı yok.`);

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('WHITE');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`Çalma Kuyruğu - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title}`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 10 ? `Ve **${songs - 10}** şarkı daha..` : `Sırada **${songs}** şarkı var..`;

        embed.setDescription(`Şuanda **${queue.current.title}** Çalıyor..\n\n${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter('Music comes first ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};