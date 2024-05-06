const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('whatsapp')
      .setDescription('Conéctate con nosotros en WhatsApp para una asesoría más privada y personal.'),
    async execute(interaction) {
      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Chat en WhatsApp')
            .setStyle(ButtonStyle.Link)
            .setURL('https://wa.me/525565048969')
        );

      const embed = new EmbedBuilder()
        .setColor(0x25D366)
        .setTitle('¡Habla con nosotros en WhatsApp!')
        .setDescription('Únete a nuestro WhatsApp para obtener una asesoría personalizada y directa.')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      await interaction.reply({ embeds: [embed], components: [button] });
    }
};
