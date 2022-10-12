const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'şarkı',
    aliases: ['np', 'nowplaying'],
    utilisation: 'şarkı',
    category: 'music',
    description: 'Şuanda çalan şarkıyı gösterir.',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('WHITE');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Ses Düzeyi **${queue.volume}**%\nSüre **${trackDuration}**\nDöngü Modu **${methods[queue.repeatMode]}**\n ${track.requestedBy} tarafından talep edildi.`);

        embed.setTimestamp();
        embed.setFooter('Music comes first ❤️', message.author.avatarURL({ dynamic: true }));

        const saveButton = new MessageButton();

        saveButton.setLabel('Bu Şarkıyı Kaydet');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};