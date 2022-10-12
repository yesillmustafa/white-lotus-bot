const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'zar',
    aliases: ['zarat'],
    utilisation: 'zar',
    description: 'Zar atar.',
    category: 'fun',
    execute(client, message) {

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('🎲 Zarın: ' + doMagicDiceVoodoo() + ' geldi.');


        message.channel.send({ embeds: [embed] })

        function doMagicDiceVoodoo() {
            var rand = ['1', '2', '3', '4', '5', '6'];

            return rand[Math.floor(Math.random() * rand.length)];
        }



    }



}