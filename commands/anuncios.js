const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anuncios')
        .setDescription('Crea un anuncio personalizado.')
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nombre del anuncio')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('texto')
                .setDescription('Texto del anuncio')
                .setRequired(true)),
    async execute(interaction) {
        const authorizedUserId = '407016766334828544'; // ID del usuario autorizado para usar el comando
        if (interaction.user.id !== authorizedUserId) {
            await interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
            return;
        }

        const nombreAnuncio = interaction.options.getString('nombre');
        const textoAnuncio = interaction.options.getString('texto');

        const embed = new EmbedBuilder()
            .setColor(0xFA1845)
            .setTitle(` <a:nageneralupdates:1236024363120066691> ${nombreAnuncio}  <a:nageneralupdates:1236024363120066691>`)
            .setDescription(textoAnuncio)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setTimestamp()
            .setFooter({ text: 'Bz Softwares Bot | Anuncio', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

        await interaction.reply({ content: '||@everyone|| ||@here||', embeds: [embed] });
    }
};
