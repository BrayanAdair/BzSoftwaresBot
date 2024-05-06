const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instagram')
        .setDescription('Síguenos para tips y más sobre cómo potenciar tu marca.'),
    async execute(interaction) {
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Visitar Instagram')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://www.instagram.com/bzsoftwares/')
            );

        const embed = new EmbedBuilder()
            .setColor(0xC13584)
            .setTitle('¡Síguenos en Instagram!')
            .setDescription('Descubre tips, historias y reels sobre cómo nuestros servicios pueden elevar tu marca.')
            .setTimestamp()
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

        await interaction.reply({ embeds: [embed], components: [button] });
    }
};
