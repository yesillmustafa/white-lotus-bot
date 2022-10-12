const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'prefix',
    aliases: [],
    utilisation: 'prefix <px>',
    description: 'Botun prefix`ini değiştir.',
    permission: 'ADMINISTRATOR',
    category: 'moderasyon',
    async execute(client, message, args, Tags, tag) {

        if (message.member.permissions.has(this.permission)) {
            const db_prefix = tag.get("prefix")

            if (!args[0]) {
                const embed1 = new MessageEmbed()
                embed1.setTitle('Prefix')
                embed1.setColor('WHITE')
                embed1.setDescription(`Prefixinizi değiştirmek için \n**${db_prefix}prefix <px>** komutunu kullanın.`)
                embed1.addField('Mevcut Prefix: ', `**${db_prefix}**`)
                await message.channel.send({ embeds: [embed1] })
                return
            }

            if (args.join(" ").length > 2) return message.channel.send("❌ **Prefix max. 2 karakterden oluşabilir.**")

            if (db_prefix == args.join(" ")) return message.channel.send('**Ayarlamak istediğiniz prefix mevcut olan prefix ile aynı.**')
            await Tags.update({ prefix: args.join(" ") }, { where: { guild_id: message.guild.id } })
            const embed = new MessageEmbed()
            embed.setTitle('Prefix değiştirildi;')
            embed.setColor('WHITE')
            embed.addField('Mevcut Prefix:', `**${args.join(" ")}**`, true)
            embed.addField('Eski Prefix:', `**${db_prefix}**`, true)
            await message.channel.send({ embeds: [embed] })
        } else { return message.channel.send('Bu Komutu kullanmak için yeterli yetkiye sahip değilsin.') }




    }
}