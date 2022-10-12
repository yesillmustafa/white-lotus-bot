const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ['pp'],
    utilisation: 'avatar',
    description: 'Kendi avatarınızı yada etiketlediğiniz kişinin avatarını gösterir.',
    category: 'genel',
    execute(client, message, args) {

        const mentionedUser = message.mentions.members.first();

        const selfAvatarEmbed = new MessageEmbed()
        selfAvatarEmbed.setColor("#00a6ff")
        selfAvatarEmbed.setAuthor(`${message.author.username}`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
        selfAvatarEmbed.setImage(`${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
            //.setTimestamp()
        selfAvatarEmbed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)

        if (!mentionedUser) return message.channel.send({ embeds: [selfAvatarEmbed] });
        const userAvatar = mentionedUser.user.avatarURL({ dynamic: true, format: 'png', size: 1024 })

        const noAvatarEmbed = new MessageEmbed()
        noAvatarEmbed.setColor("#00a6ff")
        noAvatarEmbed.setAuthor(`${mentionedUser.user.username}`, `${userAvatar}`)
        noAvatarEmbed.setDescription("Bu Kullanıcının Avatarı Yok.")
            //.setTimestamp()
        noAvatarEmbed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)


        if (userAvatar == null) {
            const avatarEmbed = new MessageEmbed()
            noAvatarEmbed.setColor("#00a6ff")
            noAvatarEmbed.setAuthor(`${mentionedUser.user.username}`)
            noAvatarEmbed.setDescription("Bu Kullanıcının Avatarı Yok!")
                //.setTimestamp()
            noAvatarEmbed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)

            message.channel.send({ embeds: [noAvatarEmbed] });

        } else {
            const avatarEmbed = new MessageEmbed()
            avatarEmbed.setColor("#00a6ff")
            avatarEmbed.setAuthor(`${mentionedUser.user.username}`, `${userAvatar}`)
            avatarEmbed.setImage(`${userAvatar}`)
                //.setTimestamp()
            avatarEmbed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)

            message.channel.send({ embeds: [avatarEmbed] });

        }




    }

}