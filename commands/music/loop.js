const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'döngü',
    aliases: ['lp', 'repeat', 'loop'],
    utilisation: 'döngü <queue>',
    category: 'music',
    description: 'Dinlediğiniz şarkıyı yada çalma listenizi döngü moduna alır.',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.reply(`❌ İlk Önce Şuan Çalan Şarkıyı Döngü Modundan Çıkarmalısınız. (${client.config.app.px}loop)`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `✅ Döngü Modu ${queue.repeatMode === 0 ? '**Devre Dışı.**\nKuyruk Döngü Modundan Çıkarıldı.' : '**Aktif.** \nTüm sıra durmadan tekrarlanacak 🔁'}` : `Bir Şeyler Yanlış Gitti. ❌`);
        } else {
            if (queue.repeatMode === 2) return message.reply(`❌ Döngü modunda önce mevcut kuyruğu devre dışı bırakmalısınız. (${client.config.app.px}loop queue)`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `✅ Döngü Modu **${queue.repeatMode === 0 ? 'Devre Dışı.' : 'Aktif.'}** \n(<queue> seçeneği ile kuyruğu döngüye alabilirsiniz.) 🔂` : `Bir Şeyler Yanlış Gitti.❌`);
        };
    },
};