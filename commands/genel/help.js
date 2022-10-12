const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['yardım'],
    utilisation: `help`,
    description: 'Yardım Komutlarını gösterir.',
    showHelp: false,

    execute(client, message, args, Tags, tag) {

        if (!args[0]) {
            const embed = new MessageEmbed()
            embed.setDescription('```diff\n-⚠️- Botumuz şuanda beta sürecindedir ve sürekli gelişim halindedir. </developing by Tearin> 💖```')
            embed.setAuthor(client.user.username + ' | 📌 Yardım Komutları', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            embed.setColor('WHITE');
            embed.addFields({ name: '⚙️ Genel', value: `\`${tag.get("prefix")}yardım genel\``, inline: true }, { name: '😄 Eğlence', value: `\`${tag.get("prefix")}yardım eğlence\``, inline: true }, { name: '🛠 Moderasyon', value: `\`${tag.get("prefix")}yardım moderasyon\``, inline: true }, { name: '\u200B', value: '\u200B', inline: true }, { name: '🎶 Müzik', value: `\`${tag.get("prefix")}yardım müzik\``, inline: true }, { name: '\u200B', value: '\u200B', inline: true })
            embed.setImage('https://i.hizliresim.com/rr4994a.png')
            embed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
            embed.setTimestamp()

            message.channel.send({ embeds: [embed] })
            return
        }
        if (args[0] == 'genel') {
            const genelcmd = client.commands.filter(cmd => cmd.category == 'genel' && cmd.showHelp !== false)
            const embed = new MessageEmbed()
            embed.setAuthor(client.user.username + ' | ⚙️ Genel Komutlar', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            embed.setColor('WHITE');
            genelcmd.forEach(cmd => {
                embed.addField(`📌 ${cmd.name}`, `Kullanımı: \`${tag.get("prefix")}${cmd.utilisation}\`\nAçıklaması: ${cmd.description}`)
            });
            embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
            embed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
            embed.setTimestamp()

            message.channel.send({ embeds: [embed] })
            return
        }
        if (args[0] == 'eğlence' || args[0] == 'fun') {
            const funcmd = client.commands.filter(cmd => cmd.category == 'fun' && cmd.showHelp !== false)
            const embed = new MessageEmbed()
            embed.setAuthor(client.user.username + ' | 😄 Eğlence Komutları', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            embed.setColor('WHITE');
            funcmd.forEach(cmd => {
                embed.addField(`📌 ${cmd.name}`, `Kullanımı: \`${tag.get("prefix")}${cmd.utilisation}\`\nAçıklaması: ${cmd.description}`)
            });
            embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
            embed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
            embed.setTimestamp()

            message.channel.send({ embeds: [embed] })
            return
        }
        if (args[0] == 'moderasyon' || args[0] == 'mod') {
            const modcmd = client.commands.filter(cmd => cmd.category == 'moderasyon' && cmd.showHelp !== false)
            const embed = new MessageEmbed()
            embed.setAuthor(client.user.username + ' | 🛠 Moderasyon Komutları', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            embed.setColor('WHITE');
            modcmd.forEach(cmd => {
                embed.addField(`📌 ${cmd.name}`, `Kullanımı: \`${tag.get("prefix")}${cmd.utilisation}\`\nAçıklaması: ${cmd.description}`)
            });
            embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
            embed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
            embed.setTimestamp()

            message.channel.send({ embeds: [embed] })
            return
        }
        if (args[0] == 'music' || args[0] == 'müzik') {
            const musiccmd = client.commands.filter(cmd => cmd.category == 'music' && cmd.showHelp !== false)
            const embed = new MessageEmbed()
            embed.setAuthor(client.user.username + ' | 🎶 Müzik Komutları', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            embed.setColor('WHITE');
            musiccmd.forEach(cmd => {
                embed.addField(`📌 ${cmd.name}`, `Kullanımı: \`${tag.get("prefix")}${cmd.utilisation}\`\nAçıklaması: ${cmd.description}`)
            });
            embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
            embed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
            embed.setTimestamp()

            message.channel.send({ embeds: [embed] })
            return
        }


    },
};