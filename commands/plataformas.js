const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('plataformas')
      .setDescription('Descubre nuestras plataformas hechas para ti'),
    async execute(interaction) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const autor = interaction.user.username;
      const profile_img = interaction.user.displayAvatarURL();
      const header = `@${autor} | Plataformas`;

      const title = 'Explora nuestras plataformas';
      const description = 'Puedes explorar nuestros servicios e información a través de nuestras plataformas dedicadas:';
      const links = `\n**Consulta nuestros servicios e información general** \n<a:gear87:1236024364504322048> - [Ir a Página Principal](https://bzsoftwares.com/)\n\n**Sigue el desarrollo, legal y económico de tu proyecto** \n<a:gear87:1236024364504322048> - [Ir a Nuestro Sistema](https://sistema.bzsoftwares.com/)\n\n**Elige un diseño o consulta nuestros ejemplos** \n<a:gear87:1236024364504322048> - [Ir a Página de muestras](https://muestras.bzsoftwares.com/)\n\n**Realiza pagos de servicios adquiridos** \n<:3327paypal:1231002226470817983> - [Ir a Página de pagos](https://www.pagos.bzsoftwares.com/)\n`;

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
