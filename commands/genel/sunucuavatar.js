const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "sunucuavatar",
    aliases: ['sunucupp'],
    utilisation: 'sunucuavatar',
    description: 'Sunucunuzun avatarını gösterir.',
    category: 'genel',
    execute(client, message, args) {

        const guildIcon = message.guild.iconURL({ dynamic: true, size: 1024, format: 'png' });

        const sunucuAvatarEmbed = new MessageEmbed()
        sunucuAvatarEmbed.setColor("#00a6ff")
        sunucuAvatarEmbed.setAuthor(`${message.guild.name}`, `${guildIcon}`)
        sunucuAvatarEmbed.setImage(`${guildIcon}`)
            //.setTimestamp()
        sunucuAvatarEmbed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({dynamic: true, format: 'png' , size: 1024})}`)

        if (guildIcon == null) return message.channel.send("Bu Sunucunun Bir Avatarı Yok!")
        return message.channel.send({ embeds: [sunucuAvatarEmbed] });


    }


}