const { MessageEmbed } = require('discord.js');
const steam = require('steam-provider')
const provider = new steam.SteamProvider();
module.exports = {
    name: 'steam',
    aliases: [],
    utilisation: 'steam',
    description: 'Steamde girdiğiniz oyunun bilgilerini gösterir.',
    category: 'genel',

    execute(client, message, args) {

        let game = args[0]

        let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png"

        if (!game) return message.reply('Lütfen Steamde Olan Bir Oyunun Adını Yazın. Örnek: `steam PUBG`')

        provider.search(game).then(result => {
            if (result.length == 0) {
                message.channel.send("Lütfen geçerli bir arama girin.")
            } else {
                provider.detail(result[0].id, "turkey", "tr").then(results => {
                    const embed = new MessageEmbed()
                    embed.setAuthor('Steam Store', steampng)
                    embed.setColor("RANDOM")
                    embed.setTitle(result[0].name)
                    embed.setURL(result[0].url)
                    embed.setImage(results.otherData.imageUrl)
                    embed.addField(`Oyunun ID'sı`, result[0].id, true)
                    embed.addField('\u200B', '\u200B', true)
                    if (results.priceData.initialPrice != results.priceData.finalPrice) {

                        embed.addField('Fiyati', `~~${results.priceData.initialPrice}~~ ₺\n\`-${results.priceData.discountPercent}%\` **${results.priceData.finalPrice}** ₺`, true)
                    } else if (results.priceData.initialPrice == 0.0) {
                        embed.addField('Fiyati', `Oynaması Ücretsiz`, true)
                    } else {
                        embed.addField('Fiyati', `**${results.priceData.initialPrice}** ₺`, true)
                    }

                    embed.addField('Türleri', results.genres.toString(), true)
                    embed.addField('\u200B', '\u200B', true)
                    embed.addField('Platformlar', results.otherData.platforms.toString(), true)
                    embed.addField('Etiketleri', results.otherData.features.toString())
                    embed.setFooter(`Geliştiricileri: ${results.otherData.developer.toString()} | Yayımcıları: ${results.otherData.publisher.toString()}`)
                    message.channel.send({ embeds: [embed] }).catch(e => {
                        console.log(e)
                        message.reply('Hata Olustu Yada `' + game + '` Adlı Oyun Bulunamadı')
                    })
                })
            }

        })
    }


}