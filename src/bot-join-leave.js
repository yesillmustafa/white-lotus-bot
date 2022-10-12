const database = require('../utils/database')
const Tags = database()

client.on('guildCreate', async guild => {
    await Tags.create({ guild_id: guild.id })
    await Tags.update({ guild_name: guild.name }, { where: { guild_id: guild.id } })
})

client.on('guildDelete', async guild => {
    await Tags.destroy({ where: { guild_id: guild.id } })
})