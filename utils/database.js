module.exports = () => {

    const Sequelize = require("sequelize")

    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'database.sqlite'
    })

    const Tags = sequelize.define('tags', {
        guild_id: { type: Sequelize.STRING, unique: true, allowNull: false },
        guild_name: { type: Sequelize.STRING },
        prefix: { type: Sequelize.STRING, defaultValue: '!' }

    })
    return Tags
}