const { Player } = require("discord-player");
const Discord = require("discord.js");
const cooldowns = new Discord.Collection();
const database = require('../utils/database')
const Tags = database()

client.on('messageCreate', async message => {

    if (message.author.bot || message.channel.type === 'dm') return;

    // ONLY IMAGE NO TEXT CHANNEL
    if (message.channel.name == "dijital-fotoğrafçılık") {
        if (message.attachments.size < 1) {
            await message.delete();
            await message.channel.send({ embeds: [{ description: "Bu Kanala Sadece Fotoğraf atabilirsin.", color: "#ff0000" }] }).then(msg => {
                setTimeout(async function() {
                    await msg.delete()
                }, 3000)
            })
            return
        }
    }

    //prefix
    const tag = await Tags.findOne({ where: { guild_id: message.guild.id } })
    var prefix = tag.prefix

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member._roles.includes(roleDJ.id)) {
            return message.channel.send(`This command is reserved for members with the ${DJ.roleName} role on the server ${message.author}... try again ? ❌`);
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) return message.channel.send(`❌ ${message.author} Herhangi bir ses kanalında değilsin.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`❌ ${message.author} Botla aynı kanalda olmadığın için bu komutu kullanamazsın.`);
    }
    //premission hata veriyor. komut içerisinde kontrol yapılarak çözüldü.
    // if (cmd.permission && !message.member.permissions.has(cmd.permission)) return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsin.")

    // Cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const timestamp = cooldowns.get(command.name);
    const now = Date.now();
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamp.has(message.author.id)) {
        const expirationTime = timestamp.get(message.author.id) + cooldownAmount;
        if (expirationTime > now) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Çok Hızlı Yazıyorsun.. Lütfen ${parseInt(timeLeft+1)} saniye bekleyiniz.`).then(msg => {
                setTimeout(function() {
                    msg.delete()
                }, 1000)
            })

        }
    }

    timestamp.set(message.author.id, now);
    setTimeout(() => {
        timestamp.delete(message.author.id);
    }, cooldownAmount);

    if (cmd) cmd.execute(client, message, args, Tags, tag);
})