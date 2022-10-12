const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'oylama',
    aliases: [],
    utilisation: 'oylama <deneme>',
    description: 'Oylama yapmanızı sağlar.',
    category: 'genel',
    execute(client, message, args) {

        let question = args.join(' ');

        if (!question) {
            return message.channel.send('❌ Neyi oylamak istediğini gir')

        }
        const embed = new MessageEmbed()

        embed.setColor("RANDOM")
        embed.setAuthor(`Oylama;`)
        embed.setTitle(`**${question}**`)
        embed.setThumbnail(client.user.displayAvatarURL())
        embed.setTimestamp()
        embed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
        message.channel.send({ embeds: [embed] }).then(function(message) {

            message.react('✅');
            message.react('❌');

        });



    }



}