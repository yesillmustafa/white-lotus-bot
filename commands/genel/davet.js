const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'davet',
    aliases: ['invite'],
    utilisation: 'davet',
    description: 'Botun davet linkini atar.',
    category: 'genel',

    execute(client, message, args) {

        const embed = new MessageEmbed()
        embed.setTitle("Bot Davet Linki:")
        embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));
        embed.setImage(client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        embed.setURL('https://discord.com/oauth2/authorize?client_id=908851511369564201&scope=bot&permissions=1099511627775')
        embed.setDescription("https://discord.com/oauth2/authorize?client_id=908851511369564201&scope=bot&permissions=1099511627775")
        embed.setColor("WHITE")
        embed.setTimestamp()
        embed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)

        message.channel.send({ embeds: [embed] });


    }
}