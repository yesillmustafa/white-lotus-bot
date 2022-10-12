const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'yazıtura',
    aliases: ['yt'],
    utilisation: 'yazıtura',
    description: 'Yazı tura atar.',
    category: 'fun',

    async execute(client, message) {
        var yazı_tura = ['Yazi', 'Tura']
        const yazitura = ((yazı_tura[Math.floor(Math.random() * yazı_tura.length)]));

        const yaziembed = new MessageEmbed();
        yaziembed.setColor("WHITE")
        yaziembed.setTitle('Yazı Geldi!')
        yaziembed.setImage("https://i.hizliresim.com/t61ax3o.png")
        yaziembed.setFooter(`${message.author.username} Tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)

        const turaembed = new MessageEmbed();
        turaembed.setColor("WHITE")
        turaembed.setTitle('Tura Geldi!')
        turaembed.setImage("https://i.hizliresim.com/tbo54kl.png")
        turaembed.setFooter(`${message.author.username} Tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)

        if (yazitura == 'Yazi') {

            message.channel.send({ embeds: [yaziembed] })

        } else {

            message.channel.send({ embeds: [turaembed] })
        }
    }
}