const database = require('../utils/database.js')
const Tags = database()

client.once('ready', async() => {
    console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);
    client.user.setActivity(client.config.app.playing);

    // database
    await Tags.sync()
        // database check
        // ekleme
    const servers = []
    client.guilds.cache.forEach(async guild => {
            servers.push(guild.id)
            const tag = await Tags.findOne({ where: { guild_id: guild.id } })
            if (tag == null) {
                await Tags.create({ guild_id: guild.id })
                await Tags.update({ guild_name: guild.name }, { where: { guild_id: guild.id } })
            }

        })
        // çıkarma
    await Tags.findAll().then(g_list => {
        g_list.forEach(async guild_db => {
            const db_id = guild_db.dataValues.guild_id
            if (!servers.includes(db_id)) {
                await Tags.destroy({ where: { guild_id: db_id } })
            }
        })
    })

});