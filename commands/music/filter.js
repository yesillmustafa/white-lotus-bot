module.exports = {
        name: 'filter',
        aliases: ['filtre'],
        utilisation: 'filter [filter name]',
        category: 'music',
        description: 'Belirttiğiniz filtreyi aktif eder.',
        voiceChannel: true,

        async execute(client, message, args) {
            const queue = player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send("❌ Şuanda çalan bir şarkı yok.")

            const actualFilter = queue.getFiltersEnabled()[0];

            if (!args[0]) return message.channel.send({ embeds: [{ description: `Lütfen etkinleştirmek veya devre dışı bırakmak için geçerli bir filtre belirtin..\n${actualFilter ? `Filtre Şu anda aktif. ${actualFilter} (Filtreyi kapatmak için ${client.config.app.px}filter ${actualFilter} yazın.).\n` : ''}`,color: "WHITE"}]});

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send({embeds:[{description:`Bu Filtre Mevcut Değil❌\n${actualFilter ? `Filtre şu anda etkin ${actualFilter}.\n` : ''}Kullanılabilir Filtre Listesi: ${filters.map(x => `**${x}**`).join(', ')}.`,color:"WHITE"}]});

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send({embeds:[{description:`${filter} filtresi şu anda **${queue.getFiltersEnabled().includes(filter) ? 'etkin' : 'devre dışı'}** ✅\n* Hatırlatma: müzik ne kadar uzun olursa, o kadar uzun sürer.*`,color:"WHITE"}]});
    },
};