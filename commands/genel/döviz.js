const { MessageEmbed } = require('discord.js');
const Doviz = require('tcmb-doviz');

module.exports = {
    name: 'döviz',
    aliases: ['kur'],
    utilisation: 'döviz',
    description: 'Güncel Döviz kurlarını gösterir.',
    category: 'genel',

    async execute(client, message, args) {
        const data = await Doviz.getData()

        if (!args[0]) {
            message.channel.send("Lütfen bir döviz birim kodu girin.")

            const embed = new MessageEmbed()
            embed.setAuthor(client.user.username + ' | 💵 Döviz', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            embed.setTitle("Döviz Birim Kodları;")
            embed.setColor("WHITE")

            data.exchanges.forEach(element => {
                embed.addField(element.name, element.code, true)
            });
            embed.setThumbnail("https://i.hizliresim.com/mbec9sp.png")
            embed.setFooter("Türkiye Cumhuriyet Merkez Bankası", 'https://i.hizliresim.com/mbec9sp.png')
            await message.channel.send({ embeds: [embed] })

        } else {
            const res = await Doviz.getExchangeRate(args[0].toUpperCase())
            if (res == undefined) {
                message.channel.send("Lütfen geçerli birim kodu girin.")
            } else {
                const embed = new MessageEmbed()
                embed.setAuthor(`${res.name} | Güncel Kur Analizi`, 'https://i.hizliresim.com/mbec9sp.png');
                embed.setDescription(`Bilgiler [Merkez Bankası(TCMB)](https://www.tcmb.gov.tr/kurlar/kurlar_tr.html) Üzerinden Çekilmektedir. \n \`\`${data.date}\`\` tarihinde güncellenmiştir.`);
                embed.setColor("BLUE");
                embed.addField(`Alış`, `${res.buying.toString()} ₺`, true);
                embed.addField(`Satış`, `${res.selling.toString()} ₺`, true);
                embed.addField(`Birim Kodu`, res.code, true);
                embed.setImage("https://i.hizliresim.com/rls8p7j.png")
                message.channel.send({ embeds: [embed] });
            }

        }

    }

}