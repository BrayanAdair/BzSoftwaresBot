const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('discord')
      .setDescription('Únete a nuestro servidor de Discord para soporte y para estar con nuestra comunidad.'),
    async execute(interaction) {
      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Únete a Discord')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/invite/dNySgbndgN')
        );

      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('¡Únete a nuestro servidor de Discord!')
        .setDescription('Únete a nuestra comunidad en Discord para obtener soporte y compartir con otros usuarios.')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      await interaction.reply({ embeds: [embed], components: [button] });
    }
};
