module.exports = {
    name: "mesajsil",
    aliases: ['clear', 'sil', 'temizle'],
    permission: 'MANAGE_MESSAGES',
    utilisation: 'sil <10>',
    description: 'Metin kanalından belirttiğiniz sayıda mesaj siler.',
    category: 'moderasyon',
    execute(client, message, args) {

        if (message.member.permissions.has(this.permission)) {
            const sayi = parseInt(args[0]);
            if (isNaN(sayi)) return message.channel.send("Lütfen Kaç Mesaj Silmek İstediğinizi Giriniz. (2-100)");
            if (sayi < 2 || sayi > 100) return message.channel.send("En Az 2, En fazla 100 Mesaj Silebilirsiniz. ");

            message.channel.bulkDelete(sayi, false).then(() => {
                    return message.channel.send("Mesajlar Başarıyla Temizlendi.")
                        .then(msg => {
                            setTimeout(function() {
                                msg.delete()
                            }, 1000)
                        })

                })
                .catch(() => {
                    return message.channel.send("14 Günden Uzun Süre Duran Mesajlar Silinemez.")
                        .then(msg => {
                            setTimeout(function() {
                                msg.delete()
                            }, 3000)
                        })

                })
        } else { return message.channel.send('Bu Komutu Kullanmak için yeterli yetkiye sahip değilsin.') }


    }

}