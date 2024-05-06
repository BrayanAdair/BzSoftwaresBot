const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('pagos')
      .setDescription('Conoce nuestras opciones de pago y realiza transacciones seguras'),
    async execute(interaction) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const autor = interaction.user.username;
      const profile_img = interaction.user.displayAvatarURL();
      const header = `@${autor} | Bz Softwares`;

      const title = 'Opciones de Pago';
      const description = `En Bz Softwares, ofrecemos una pasarela de pagos segura y versátil para atender a clientes tanto nacionales como internacionales. Aquí están las opciones que puedes utilizar:\n\n- **Tarjetas Visa y MasterCard**: Aceptamos las principales tarjetas de crédito.\n- **PayPal**: Para transacciones rápidas y seguras.\n- **Transferencias y depósitos nacionales**: Para clientes en México, necesitarás abrir un ticket para que podamos proporcionarte los datos necesarios para la transferencia.\n\nUtiliza nuestro sistema de pagos para procesar tus pagos de manera eficiente y segura.`;

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
            .setLabel('Realizar un Pago')
            .setStyle(ButtonStyle.Link)
            .setURL('https://pagos.bzsoftwares.com')
        );

      await interaction.reply({ embeds: [embed], components: [row] });
    }
};
