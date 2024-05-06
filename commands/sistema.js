const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('sistema')
      .setDescription('Accede a nuestro sistema y explora sus múltiples funcionalidades'),
    async execute(interaction) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const autor = interaction.user.username;
      const profile_img = interaction.user.displayAvatarURL();
      const header = `@${autor} | Bz Softwares`;

      const title = 'Accede a nuestro sistema';
      const description = `En nuestro sistema, los usuarios pueden acceder y gestionar múltiples aspectos de su proyecto y relación contractual con nosotros. Aquí están algunas de las cosas que puedes hacer:\n\n- **Ver información detallada de contratos**: Revisa los términos y la privacidad de tus acuerdos.\n- **Crear y gestionar tickets internos**: Para soporte o consultas directas.\n- **Ver garantías**: Detalles sobre la cobertura de garantía de nuestros servicios y productos.\n- **Enviar mensajes internos**: Comunicación directa y segura dentro del sistema.\n- **Visualizar facturas**: Accede y revisa tus facturas y otros documentos financieros.\n- **Seguimiento del avance de proyectos**: Monitorea el progreso de tus proyectos en tiempo real.`;

      const embed = new EmbedBuilder()
        .setAuthor({ name: header, iconURL: profile_img })
        .setColor(0xFA1845)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Ingresa a nuestro Sistema')
            .setStyle(ButtonStyle.Link)
            .setURL('https://sistema.bzsoftwares.com')
        );

      await interaction.reply({ embeds: [embed], components: [row] });
    }
};
