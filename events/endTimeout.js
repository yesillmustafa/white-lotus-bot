module.exports = class EndTimeout {
    constructor() {
        this.timeouts = new Map();
    }

    setTimeout(queue) {
        let timeout = setTimeout(async() => {

            if (!queue.current) {
                queue.connection.disconnect();
                queue.destroy(true);
                await queue.metadata.send({ embeds: [{ description: "5 dakika içerisinde listeye yeni bir şarkı eklenmediği için kaçıyorum bay bay. \nBant genişliği dolar gibidir yükselmemesi gerekir 😘", color: "WHITE" }] });

            }

        }, 300000);
        this.timeouts.set(queue.guild.id, timeout);
    }

    clearTimeout(queue) {
        let timeout = this.timeouts.get(queue.guild.id);
        if (timeout) {
            clearTimeout(timeout);
            this.timeouts.delete(queue.guild.id);
        }
    }
}