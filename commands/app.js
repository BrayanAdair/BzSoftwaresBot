const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('app')
        .setDescription('Descubre más sobre nuestra aplicación móvil, próximamente en Play Store y App Store.'),
    async execute(interaction) {
        const header = `@${interaction.user.username} | Bz Softwares`;
        const embed = new EmbedBuilder()
            .setColor(0x00ACEE) // Color celeste para un look "tecnológico"
            .setTitle('Nuestra App Móvil ¡Próximamente!')
            .setDescription('**¡Grandes noticias!**\nNuestra aplicación estará disponible muy pronto en las siguientes plataformas:\n\n<:android_company:1236074260234244156>  **Play Store**\n<:9737apple:1231002232606949426>  **App Store**\n\n¡Mantente atento para más actualizaciones y prepárate para llevar nuestra experiencia a tu dispositivo móvil!')
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
