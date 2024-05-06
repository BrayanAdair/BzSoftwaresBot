const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instagramanuncio')
        .setDescription('¡Síguenos en Instagram para obtener descuentos exclusivos!'),
    async execute(interaction) {
        const authorizedUserId = '407016766334828544';
        if (interaction.user.id !== authorizedUserId) {
            await interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0xFA1845)
            .setTitle(' <a:nageneralupdates:1236024363120066691> ¡ANUNCIO IMPORTANTE!  <a:nageneralupdates:1236024363120066691>')
            .setDescription('\n\n <a:Konfeti:1236024360578322493> **ESTAMOS EN INSTAGRAM** <a:Konfeti:1236024360578322493>\n Nos complace anunciar que ahora puedes seguirnos en Instagram. ¡No te pierdas nuestros próximos tips de programación, ofertas exclusivas y mucho más!')
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setTimestamp()
            .setFooter({ text: 'Bz Softwares Bot | Anuncio', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Síguenos en Instagram')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://www.instagram.com/bzsoftwares/')
            );

        await interaction.reply({ content: '||@everyone|| ||@here||', embeds: [embed], components: [buttons] });
    }
};
