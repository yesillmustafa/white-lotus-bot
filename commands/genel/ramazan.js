const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "ramazan",
    aliases: ['vakit', 'iftar'],
    utilisation: 'iftar',
    description: 'Ramazan Ayına özel girilen şehrin iftar saatini gösterir.',
    category: 'genel',
    execute(client, message, args) {
        const city = args[0];
        if (!city) return message.channel.send('Şehir adı girmelisiniz.');
        axios.get(`https://api.collectapi.com/pray/single?ezan=Ak%C5%9Fam&data.city=${city.toLowerCase()}`, {
            headers: {
                "content-type": "application/json",
                "authorization": "apikey 0ExRXqNuFl4e5GRR1gOWEy:062vVETGwYIZFYQt66VArd"
            }
        }).then(res => {
            const messageEmbed = new MessageEmbed()
            messageEmbed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            if (res.data.result[0].hour == undefined && res.data.result[0].min == undefined) {
                messageEmbed.setDescription(`şehri için iftar saati:  **${res.data.result[0].time}.**\`\`\`Okundu\`\`\``);
            } else {
                messageEmbed.setDescription(`şehri için iftar saati:  **${res.data.result[0].time}.**\`\`\`Kalan Süre: ${res.data.result[0].hour} ${res.data.result[0].min}\`\`\``);
            }

            messageEmbed.setColor('WHITE')
            messageEmbed.setTitle(` **${city.toUpperCase()}**`)
            messageEmbed.setFooter(`${message.author.username}#${message.member.user.discriminator} tarafından istendi.`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
            message.channel.send({ embeds: [messageEmbed] });
        }).catch(err => {
            message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
            console.log(err);
        });


    }
}