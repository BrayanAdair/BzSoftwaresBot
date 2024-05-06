const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('muestras')
      .setDescription('Explora nuestras muestras y plantillas disponibles para desarrollo rápido'),
    async execute(interaction) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const autor = interaction.user.username;
      const profile_img = interaction.user.displayAvatarURL();
      const header = `@${autor} | Muestras`;

      const title = 'Nuestras Muestras y Plantillas';
      const description = `En Bz Softwares, contamos con una amplia gama de plantillas y sistemas listos para implementar que acelerarán el desarrollo de tu proyecto. Aquí están algunas de nuestras opciones:\n\n- **+90 Plantillas Web de Entrega Rápida**: Variedad de diseños listos para tu sitio web.\n- **+5 Plantillas de Diseño para Tiendas E-commerce**: Especializadas en plataformas de comercio electrónico.\n- **+3 Ejemplos de Plataforma E-learning**: Muestra de sistemas educativos en línea.\n- **Ejemplos de Clientes**: Proyectos reales que han sido autorizados para mostrar como referencia.\n- **+6 Sistemas Hechos Libres para Vender o Modificar**: Sistemas completos disponibles para personalización y venta rápida.`;

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
            .setLabel('Explorar Muestras')
            .setStyle(ButtonStyle.Link)
            .setURL('https://muestras.bzsoftwares.com')
        );

      await interaction.reply({ embeds: [embed], components: [row] });
    }
};
