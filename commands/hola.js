const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('hola')
      .setDescription('Descubre quiénes somos y qué hacemos en Bz Softwares'),
    async execute(interaction) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const autor = interaction.user.username;
      const profile_img = interaction.user.displayAvatarURL();
      const header = `@${autor} | Bz Softwares`;

      const title = '¡Hola, nosotros somos Bz Softwares!';
      const description = `En Bz Softwares, nos dedicamos a brindarte soluciones de software a medida, enfocándonos en tus necesidades específicas. **Las cotizaciones son completamente gratis** y ofrecemos **6 meses de soporte técnico** post-entrega para asegurar tu satisfacción y el rendimiento óptimo de tu proyecto.\n\nOfrecemos una amplia gama de **muestras y plantillas** que permiten un desarrollo y entrega rápidos. Además, tendrás acceso exclusivo a nuestro sistema donde podrás monitorear todo el proceso de desarrollo, así como aspectos legales y económicos, incluyendo la visualización de facturas.\n\nGestionamos diversas **opciones de pago**, tanto nacionales como internacionales, y te ofrecemos la flexibilidad de realizar pagos basados en porcentajes de desarrollo, adaptándonos a tus necesidades financieras.\n\nTe invitamos a leer nuestra [Misión, Visión y Valores aquí](https://discord.gg/yXcnphwp62).`;

      const embed = new EmbedBuilder()
        .setAuthor({ name: header, iconURL: profile_img })
        .setColor(0xFA1845)
        .setTitle(title)
        .setURL('https://bzsoftwares.com')
        .setDescription(description)
        .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      const buttons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Visitar nuestra web')
            .setStyle(ButtonStyle.Link)
            .setURL('https://bzsoftwares.com'),
          new ButtonBuilder()
            .setLabel('Ver muestras')
            .setStyle(ButtonStyle.Link)
            .setURL('https://muestras.bzsoftwares.com'),
          new ButtonBuilder()
            .setLabel('Ir a sistema')
            .setStyle(ButtonStyle.Link)
            .setURL('https://sistema.bzsoftwares.com')
        );

      await interaction.reply({ embeds: [embed], components: [buttons] });
    }
};
