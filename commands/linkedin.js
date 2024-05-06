const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('linkedin')
      .setDescription('Síguenos en LinkedIn para conocer oportunidades de empleo y actualizaciones corporativas.'),
    async execute(interaction) {
      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Visitar LinkedIn')
            .setStyle(ButtonStyle.Link)
            .setURL('https://www.linkedin.com/company/bzsoftwares')
        );

      const embed = new EmbedBuilder()
        .setColor(0x0A66C2)
        .setTitle('¡Conéctate con nosotros en LinkedIn!')
        .setDescription('Síguenos en LinkedIn para estar al tanto de nuevas oportunidades de empleo y novedades corporativas.')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      await interaction.reply({ embeds: [embed], components: [button] });
    }
};
