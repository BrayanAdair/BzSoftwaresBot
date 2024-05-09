const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

// Suponiendo que este ID no cambia, mantenemos una referencia al canal después de la primera búsqueda.
let cachedChannel;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sugerencia')
        .setDescription('Envía una sugerencia para mejorar nuestros servicios en Bz Softwares.')
        .addStringOption(option =>
            option.setName('sugerencia')
                .setDescription('Escribe tu sugerencia')
                .setRequired(true)),
    async execute(interaction) {
        // Indicar de inmediato que se está procesando la interacción.
        await interaction.deferReply({ ephemeral: true });

        try {
            const sugerencia = interaction.options.getString('sugerencia');
            const autor = interaction.user.username;
            const profile_img = interaction.user.displayAvatarURL();
            
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Nueva Sugerencia <a:chat:1237233336229822486>')
                .setDescription(sugerencia)
                .setAuthor({ name: autor, iconURL: profile_img })
                .setTimestamp()
                .setFooter({ text: 'Dinos lo que piensas con /sugerencia', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

            if (!cachedChannel) {
                cachedChannel = await interaction.guild.channels.fetch('1230938061559431259');
            }
            const message = await cachedChannel.send({ embeds: [embed] });

            // Añadir reacciones de manera asíncrona
            message.react('✅').catch(console.error);
            message.react('❌').catch(console.error);

            // Usar editReply aquí para enviar la respuesta final.
            await interaction.editReply({ content: `<a:verified:1231002144912576552> Tu sugerencia ha sido enviada con éxito. Puedes verla en <#${cachedChannel.id}>.` });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.' });
        }
    }
};
