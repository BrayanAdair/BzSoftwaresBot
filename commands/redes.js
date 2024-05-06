const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('redes')
      .setDescription('Descubre y apoya a Bz Softwares en nuestras diversas plataformas sociales.'),
    async execute(interaction) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const autor = interaction.user.username;
      const profile_img = interaction.user.displayAvatarURL();
      const header = `@${autor} | Redes Sociales`;
      const title = 'Nuestras Redes Sociales';
      const description = 'Tu apoyo es crucial para nosotros, sigue y participa en nuestras redes sociales:';
      const links = `\n**Únete a nuestra comunidad en Facebook** \n<:4048fblogo:1231002233878085683> - [Ir a Facebook](https://www.facebook.com/bzsoftwares).\n\n**Sigue nuestras historias y actualizaciones diarias** \n<:insta:1236024374272720968> - [Ir a Instagram](https://www.instagram.com/bzsoftwares/).\n\n**Conéctate con nosotros profesionalmente**\n<:linkedi:1236019561526984704>  - [Ir a LinkedIn](https://mx.linkedin.com/company/bzsoftwares).\n\n**Participa en nuestras discusiones y eventos**\n<a:Discord:1236019557282615336> - [Ir a Discord](https://discord.com/invite/dNySgbndgN).\n\n**Mantente en contacto directo con nosotros** \n<:x_whatsapp:1236019559983616010> - [Ir a WhatsApp](https://api.whatsapp.com/send?phone=525565048969).\n`;

      const embed = new EmbedBuilder()
        .setAuthor({ name: header, iconURL: profile_img })
        .setColor(0xFA1845)
        .setTitle(title)
        .setDescription(`${description}\n${links}`)
        .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      await interaction.reply({ embeds: [embed] });
    }
};
