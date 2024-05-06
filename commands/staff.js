const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Conoce a nuestro equipo y sus roles dentro de la empresa.'),
    async execute(interaction) {
        const header = `@${interaction.user.username} | Bz Softwares`;
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Conoce a Nuestro Equipo')
            .setDescription('Estos son los profesionales dedicados que hacen posible nuestro éxito:\n\n**Brayan** - CEO\n**Aguston** - CBO\n**Karen** - Recursos Humanos\n**Ppo** - Vendedor\n**ezioval** - Vendedor\n**juan** - Vendedor\n**asky** - Vendedor\n**albert** - Vendedor')
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
