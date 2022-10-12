const axios = require("axios");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'deprembilgi',
    aliases: ['deprem'],
    utilisation: 'deprembilgi',
    description: 'Kandilli Rasathanesi`nden güncel verileri gösterir.',
    category: 'genel',

    async execute(client, message, args) {

        try {
            const veri = await axios.get("https://api.orhanaydogdu.com.tr/deprem/live.php");
            const sondeprem = veri.data.result[0];
            const embed = new MessageEmbed()
            embed.setAuthor({ name: `${client.user.username} - Deprem Sistemi`, iconURL: client.user.avatarURL() })
            embed.setColor("RANDOM")
            embed.setTitle(`Deprem Yeri: ${sondeprem.lokasyon}`)
            embed.setDescription(`
            **Deprem Zamanı:** **<t:${sondeprem.timestamp}:f>**
          
            **Deprem Şiddeti:** \`${sondeprem.mag}\`
          
            **Deprem Derinliği:** \`${sondeprem.depth}km\`
          
            **Deprem Koordinatları:** \`${sondeprem.coordinates}\`
            `)
            embed.setFooter({ text: `${message.author.tag} Tarafından istendi`, iconURL: message.author.avatarURL({ dynamic: true }) })
            embed.setTimestamp()
            message.channel.send({ embeds: [embed] })
        } catch (error) {
            message.channel.send('Bir hata ile karşılaşıldı!')
            console.log(error)
        }

    }
}