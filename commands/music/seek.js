const ms = require('ms');

module.exports = {
    name: 'süre',
    aliases: ['progress', 'seek'],
    utilisation: 'süre [time]',
    category: 'music',
    description: 'Şarkının süresini değiştirir.(saniye cinsinden değer giriniz)',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        const timeToMS = parseInt(args.join(' ')) * 1000;
        console.log(Number.isNaN(timeToMS))
        if (Number.isNaN(timeToMS)) {

            const progress = queue.createProgressBar();
            const timestamp = queue.getPlayerTimestamp();

            if (timestamp.progress == 'Infinity') return message.channel.send(`❌ Canlı oynatılıyor, görüntülenecek veri yok.`);

            message.channel.send({ embeds: [{ title: `${progress} (**${timestamp.progress}**%)`, color: "WHITE" }] });

        } else {

            if (timeToMS >= queue.current.durationMS) return message.channel.send(`The indicated time is higher than the total time of the current song ${message.author}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);
            if (timeToMS < 0) return message.channel.send("Lütfen geçerli bir süre giriniz.");
            if (timeToMS == 0) {

                await queue.seek(timeToMS + 1000);
                const progress3 = queue.createProgressBar();
                const timestamp3 = queue.getPlayerTimestamp();


                await message.channel.send({ embeds: [{ title: `Şarkının süresi;\n${progress3} (**${timestamp3.progress}**%)\n'olarak ayarlandı.`, color: "WHITE" }] });
                return
            }

            await queue.seek(timeToMS);

            const progress2 = queue.createProgressBar();
            const timestamp2 = queue.getPlayerTimestamp();


            await message.channel.send({ embeds: [{ title: `Şarkının süresi;\n${progress2} (**${timestamp2.progress}**%)\n'olarak ayarlandı.`, color: "WHITE" }] });

        }


    },
};