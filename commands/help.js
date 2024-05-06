const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Descubre todos los comandos disponibles para interactuar con nuestro bot'),
    async execute(interaction) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const autor = interaction.user.username;
      const profile_img = interaction.user.displayAvatarURL();
      const header = `@${autor} | Help`;

      const title = 'Estos son nuestros comandos';
      const description = '¡Hola! Aquí puedes encontrar todos los comandos para interactuar con nuestro bot:\n\n**`/help`** - Lista todos los comandos públicos.\n**`/hola`** - Nuestra presentación y servicios.\n**`/plataformas`** - Acceso a todas nuestras plataformas digitales.\n**`/redes`** - Enlaces a nuestras redes sociales.\n**`/servicios`** - Detalles de todos nuestros servicios.\n**`/sistema`** - Acceso a nuestro sistema de gestión de proyectos.\n**`/facebook`** - Nuestra página de Facebook.\n**`/whatsapp`** - Enlace directo a nuestro WhatsApp.\n**`/linkedin`** - Nuestro perfil de LinkedIn.\n**`/instagram`** - Síguenos en Instagram.\n**`/discord`** - Únete a nuestro servidor de Discord.\n**`/muestras`** - Explora nuestras muestras y plantillas.\n**`/pagos`** - Realiza pagos a través de nuestra pasarela.\n**`/app`** - Información sobre nuestra app en desarrollo.\n**`/staff`** - Conoce a nuestro equipo oficial.';

      const embed = new EmbedBuilder()
        .setAuthor({ name: header, iconURL: profile_img })
        .setColor(0xFA1845)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
        .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

      await interaction.reply({ embeds: [embed] });
    }
};
