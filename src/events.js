const EndTimeout = require("../events/endTimeout");
const { MessageEmbed } = require("discord.js")
const { getData, getPreview} = require('spotify-url-info')

const endTimeout = new EndTimeout

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', async(queue, track) => {

});

player.on('trackAdd', async(queue, track) => {

    const imageUrl = track.url
    const embed = new MessageEmbed()
    var thmb = track.thumbnail

    await queue.metadata.send("🎶 **Şarkı Listeye Eklendi;**")

    
    if (imageUrl.includes("open.spotify.com")) {

        await getPreview(imageUrl)
            .then(data => thmb = data.image)
        var img = "https://i.hizliresim.com/n2k2cr8.png"
        var name = "Spotify"
        var color = "GREEN"

    } 
    else if (imageUrl.includes("youtube.com")) {
        img = "https://i.hizliresim.com/kczqk1z.png";
        name = "Youtube"
        color = "#ff0000"
    } else if (imageUrl.includes("soundcloud.com")) {
        img = "https://i.hizliresim.com/9ivq7d9.png";
        name = "SoundCloud"
        color = "#200c38"
    }


    embed.setAuthor(`${name}`, `${img}`)
    embed.setColor(`${color}`);
    embed.setThumbnail(`${thmb}`)
    embed.setTitle(`${track.title}`)
    embed.setURL(track.url)
    embed.setDescription(`${track.author}  ,  Süre: ${track.duration} dk `)
    embed.setTimestamp();
    embed.setFooter(`${track.requestedBy.username} tarafından istendi.`, track.requestedBy.displayAvatarURL({ dynamic: true }));
    queue.metadata.send({ embeds: [embed] });

});

player.on('tracksAdd', async(queue, tracks) => {
    await queue.metadata.send(`🎶 **${tracks.length} Şarkı listeye eklendi.**`)
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send({ embeds: [{ description: "Ses kanalıyla bağlantım manuel olarak kesildi, sıra temizleniyor..." }] });

});

// player.on('channelEmpty', (queue) => {
//     queue.metadata.send({ embeds: [{ description: "ben kaçar" }] });
// });

player.on('queueEnd', (queue) => {
    endTimeout.setTimeout(queue);
});

// player.on('connectionCreate', (queue) => {
//     queue.metadata.send({ embeds: [{ description: "ben geldim", color: "#ff0000" }] });
// });



client.on('voiceStateUpdate', (oldState, newState) => {
  
  // Represents a mute/deafen update
  //if(oldState.channelId === newState.chanelId) return //console.log('Mute/Deafen Update');

  // Some connection
  //if(!oldState.channelId && newState.channelId) return //console.log('Connection Update');

  // Disconnection
  if(oldState.channelId && !newState.channelId){
    // Bot was disconnected?
    if(newState.id === client.user.id) {
       const queue = player.getQueue(oldState.guild.id);
        if (!queue || !queue.playing) return
        queue.destroy();
    }
        
  }
});