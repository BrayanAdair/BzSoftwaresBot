const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-ceopresentacion')
        .setDescription('Presenta una tarjeta de presentación del director de Bz Softwares.'),
    async execute(interaction) {
        // Verificar si el ID del usuario coincide con el proporcionado
        const userId = '407016766334828544';
        if (interaction.user.id !== userId) {
            await interaction.reply({ content: '<a:alert:1231002131050266717> Solo el Director de Bz Softwares puede acceder a este comando, lo sentimos.', ephemeral: true });
            return;
        }

        // Datos estáticos para el CEO
        const nombre = 'Brayan Adair Montaño';
        const titulo = 'Director de Bz Softwares';
        const profile_img = interaction.user.displayAvatarURL();
        const autor = interaction.user.username;

        // Crear el Embed con el diseño personalizado
        const embed = new EmbedBuilder()
            .setColor(0x00BFFF)
            .setTitle(`¡Hola! Soy el Director de Bz Softwares, ${nombre}.`)
            .setDescription(`Como ${titulo}, estaré acompañándote durante todo el proceso de desarrollo y cotización de tu proyecto. Mi objetivo es asegurarme de que todas tus necesidades sean atendidas para ayudarte a alcanzar tus objetivos con éxito. Estoy aquí para guiarte en cada paso, asegurando una experiencia colaborativa y libre de presiones. ¡Espero poder trabajar contigo para llevar a cabo un proyecto exitoso!`)
            .setAuthor({ name: `${autor}`, iconURL: profile_img })
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
