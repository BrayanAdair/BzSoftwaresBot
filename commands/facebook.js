const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('facebook')
      .setDescription('Síguenos en Facebook para estar al día con nuestras últimas noticias y eventos.'),
    async execute(interaction) {
      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Visitar Facebook')
            .setStyle(ButtonStyle.Link)
            .setURL('https://www.facebook.com/bzsoftwares')
        );

      const embed = new EmbedBuilder()
        .setColor(0x1877F2)
        .setTitle('¡Síguenos en Facebook!')
        .setDescription('¡Conéctate con nosotros en Facebook para no perderte ninguna de nuestras actualizaciones y eventos especiales!')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      await interaction.reply({ embeds: [embed], components: [button] });
    }
};
