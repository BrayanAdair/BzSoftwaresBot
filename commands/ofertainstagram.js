const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ofertainstagram')
        .setDescription('Descubre las ofertas exclusivas para nuestros seguidores de Instagram.'),
    async execute(interaction) {
        // Añadiendo @everyone y @here ocultos en spoilers
        const pingContent = '||@everyone|| ||@here||';

        const embed = new EmbedBuilder()
            .setColor(0x833AB4)
            .setTitle('¡Ofertas Exclusivas para Seguidores de Instagram!')
            .setDescription('Gracias por seguirnos en Instagram y para compensarlo. ¡Aquí están tus ofertas exclusivas!')
            .addFields(
                { name: '<a:haraketliine3:1236024358686818314> Primera contratación', value: '\`10% de descuento\`', inline: false },
                { name: '<a:haraketliine3:1236024358686818314> Segunda contratación', value: '\`15% de descuento\`', inline: false },
                { name: '<a:haraketliine3:1236024358686818314> Web de entrega rápida', value: '\`25% de descuento\`', inline: false }
            )
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png')
            .setTimestamp()
            .setFooter({ text: 'Bz Softwares Bot | Oferta Exclusiva', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

        // Enviar el ping junto con el embed en el mismo mensaje
        await interaction.reply({ content: pingContent, embeds: [embed] });
    }
};
