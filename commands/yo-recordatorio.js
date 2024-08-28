const { EmbedBuilder, SlashCommandBuilder, userMention } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yo-recordatorio')
        .setDescription('Crear un recordatorio personalizado.')
        .addStringOption(option => 
            option.setName('titulo')
                .setDescription('Título del recordatorio')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('mensaje')
                .setDescription('Mensaje del recordatorio')
                .setRequired(true)),
    async execute(interaction) {
        const titulo = interaction.options.getString('titulo');
        const mensaje = interaction.options.getString('mensaje');
        const autor = interaction.user;

        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle(`Recordatorio: ${titulo}`)
            .setDescription(mensaje)
            .addFields(
                { name: 'Autor', value: userMention(autor.id), inline: true }
            )
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
