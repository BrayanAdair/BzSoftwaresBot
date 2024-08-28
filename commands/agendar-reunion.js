const { EmbedBuilder, SlashCommandBuilder, userMention } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');
const { format, parseISO, isValid } = require('date-fns');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agendar-reunion')
        .setDescription('Agendar una reunión.')
        .addStringOption(option => 
            option.setName('fecha')
                .setDescription('Fecha de la reunión (formato AAAA-MM-DD)')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('horario')
                .setDescription('Horario de la reunión (formato 7:30 pm)')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('medio')
                .setDescription('Medio de la reunión')
                .setRequired(true)
                .addChoices(
                    { name: 'Discord', value: 'Discord' },
                    { name: 'Meet', value: 'Meet' },
                    { name: 'Zoom', value: 'Zoom' },
                    { name: 'Otro', value: 'Otro' }
                ))
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a notificar')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nota')
                .setDescription('Nota adicional')
                .setRequired(false)),
    async execute(interaction) {
        const servidorId = interaction.guildId;
        const datosServidor = obtenerDatosDeServidor(servidorId);

        if (!datosServidor || !datosServidor.roles) {
            await interaction.reply({ content: 'Error en la configuración de roles del servidor.', ephemeral: true });
            return;
        }

        const vendedorRolId = Object.keys(datosServidor.roles).find(rol => datosServidor.roles[rol] === 'vendedor');

        if (!vendedorRolId || !interaction.member.roles.cache.has(vendedorRolId)) {
            await interaction.reply({ content: '<a:alert:1231002131050266717> Solo los vendedores pueden acceder a este comando, lo sentimos.', ephemeral: true });
            return;
        }

        const fecha = interaction.options.getString('fecha');
        const horario = interaction.options.getString('horario');
        const medio = interaction.options.getString('medio');
        const usuario = interaction.options.getUser('usuario');
        const nota = interaction.options.getString('nota') || 'No se proporcionó ninguna nota adicional.';
        const fechaDate = parseISO(fecha);

        if (!isValid(fechaDate)) {
            await interaction.reply({ content: 'La fecha proporcionada no es válida. Por favor, usa el formato AAAA-MM-DD.', ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Reunión Agendada')
            .setDescription(`Estimado usuario de Bz Softwares, su reunión ha sido agendada. ${userMention(usuario.id)}`)
            .addFields(
                { name: 'Fecha', value: format(fechaDate, 'PP'), inline: true },
                { name: 'Horario', value: horario, inline: true },
                { name: 'Medio', value: medio, inline: true },
                { name: 'Nota Adicional', value: `**${nota}**`, inline: false }
            )
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], content: `||${userMention(usuario.id)}||` });
    }
};
