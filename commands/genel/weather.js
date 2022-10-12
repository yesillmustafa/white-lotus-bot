const weather = require('weather-js');

module.exports = {
    name: "havadurumu",
    aliases: ['hava', 'hava-durumu', 'havabilgisi', 'weather', 'h'],
    utilisation: 'havadurumu <mersin>',
    description: 'Girdiğiniz bölgenin hava durumunu gösterir.',
    category: 'genel',
    execute(client, message, args) {
        if (!args[0]) {

            message.channel.send("Lütfen Bir Lokasyon Girin..");
            return
        }

        const konum = args.join(" ")
        message.channel.send({
            files: [
                `http://wttr.in/${konum}_0tqp_lang=tr.png`
            ]
        })

    }
}



// module.exports = {
//     name : "havadurumu",
//     aliases : ['hava','hava-durumu','havabilgisi','weather','h'],
//     guildOnly : false,
//     category : 'Genel',
//     description: 'Yazılan konumun hava durumu bilgisini gösterir.',

//   execute(message, args, Embed, Discord) {


//     if(!args.length) {
//       return message.channel.send("Lütfen Bir Lokasyon Girin.")
//     }

//  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
// try {

// let embed = new discord.MessageEmbed()
// .setTitle(`${result[0].location.name} için hava durumu`)
// .setColor("#ff2050")
// .setDescription(result[0].current.skytext)
// .addField("Sıcaklık", `${result[0].current.temperature} °C`, true)
// .addField("Nem", `${result[0].current.humidity}%`, true)
// .addField("Rüzgar", result[0].current.winddisplay, true)
// .addField("Gözlem Zamanı", result[0].current.observationtime, true)
// .setThumbnail(result[0].current.imageUrl);
//    message.channel.send(embed)
// } catch(err) {
//   return message.channel.send("Verilen konumun verileri alınamıyor")
// }
// });   


//   }
// }