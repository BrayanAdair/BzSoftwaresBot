const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-presentacion')
        .setDescription('Proporciona tu nombre para personalizar la tarjeta de presentación.')
        .addStringOption(option => 
            option.setName('nombre')
                  .setDescription('Tu nombre')
                  .setRequired(true)),
    async execute(interaction) {
        const nombre = interaction.options.getString('nombre');
        const autor = interaction.user.username;
        const profile_img = interaction.user.displayAvatarURL();
        const embed = new EmbedBuilder()
            .setColor(0x123456)
            .setTitle(`Hola, soy ${nombre}!`)
            .setDescription(`Seré el vendedor que te acompañará durante todo el proceso de desarrollo y cotización de tu proyecto. Estoy aquí para asegurarme de que todas tus necesidades sean atendidas y para ayudarte a alcanzar tus objetivos con éxito. ¡Espero poder trabajar contigo!`)
            .setAuthor({ name: `@${autor}`, iconURL: profile_img }) // Muestra el nombre y la foto de perfil del usuario que ejecuta el comando
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
