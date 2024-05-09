const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anuncioupdatebot')
        .setDescription('Anuncios de actualizaciones de nuestro bot Bz Softwares'),
    async execute(interaction) {
        const authorizedUserId = '407016766334828544';
        if (interaction.user.id !== authorizedUserId) {
            await interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0xFA1845)
            .setTitle(' <a:nageneralupdates:1236024363120066691> ¡ANUNCIO IMPORTANTE!  <a:nageneralupdates:1236024363120066691>')
            .setDescription(
                '\n\n Buenas noticias hemos tenido un buen aumento en nuestras redes sociales tanto en nuestro servidor de discord por lo que hemos hecho los siguientes cambios en el servidor \n\n<a:nageneralupdates:1236024363120066691>  **Cambios en el servidor** \n ° Cambiamos el servidor a comunidad \n ° Agregamos nuevos canales de foro para los comandos del bot \n° Agregamos nuevos comandos para nuestros clientes y boosters \n ° Nuevo canal de avisos \n ° Lanzaremos mas ofertas en los proximos días \n\n<a:nageneralupdates:1236024363120066691> **Update de nuestro bot Version 1.1**\n° Comandos de sugerencia publica \`/sugerencia\` \n ° +15 comandos de informacion pública \n ° +7 comandos para automatizar nuestro soporte en tickets \ °Para ver los comandos públicos recomendamos usar \`/help\`')
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
