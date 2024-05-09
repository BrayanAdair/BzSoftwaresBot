const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');
const { addMonths, addDays, format, parseISO, isValid } = require('date-fns');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-garantia')
        .setDescription('Establece la garantía de la cotización con la fecha de inicio y duración seleccionada.')
        .addStringOption(option =>
            option.setName('proyecto')
                .setDescription('Nombre del proyecto')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('fecha_de_inicio')
                .setDescription('Fecha de inicio del periodo de garantía (formato AAAA-MM-DD)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duracion')
                .setDescription('Duración del periodo de garantía')
                .addChoices(
                    { name: '1 mes', value: '1' },
                    { name: '3 meses', value: '3' },
                    { name: '6 meses', value: '6' }
                )
                .setRequired(true)),
    async execute(interaction) {
        // Obtener datos de permisos del servidor
        const servidorId = interaction.guildId;
        const datosServidor = obtenerDatosDeServidor(servidorId);

        if (!datosServidor || !datosServidor.roles) {
            await interaction.reply({ content: 'Error en la configuración de roles del servidor.', ephemeral: true });
            return;
        }

        const vendedorRolId = Object.keys(datosServidor.roles).find(rol => datosServidor.roles[rol] === 'vendedor');

        if (!vendedorRolId) {
            await interaction.reply({ content: 'No se encontró el permiso de "vendedor" en la configuración del servidor.', ephemeral: true });
            return;
        }

        // Verificar si el usuario tiene el rol de vendedor
        if (!interaction.member.roles.cache.has(vendedorRolId)) {
            await interaction.reply({ content: '<a:alert:1231002131050266717> Solo los vendedores pueden acceder a este comando, lo sentimos.', ephemeral: true });
            return;
        }

        // Obtener y validar las opciones proporcionadas por el usuario
        const proyecto = interaction.options.getString('proyecto');
        const fechaInicio = interaction.options.getString('fecha_de_inicio');
        const duracionMeses = parseInt(interaction.options.getString('duracion'), 10);
        const fechaInicioDate = parseISO(fechaInicio);

        if (!isValid(fechaInicioDate)) {
            await interaction.reply({ content: 'La fecha proporcionada no es válida. Por favor, usa el formato AAAA-MM-DD.', ephemeral: true });
            return;
        }

        // Calcular la fecha de soporte en función de la duración seleccionada
        const fechaSoporte = addMonths(fechaInicioDate, duracionMeses);
        const fechaCambios = addDays(fechaInicioDate, 7);

        // Crear el Embed con las fechas de garantía y el nombre del proyecto en el título
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Detalles de la Garantía - ${proyecto}`)
            .addFields(
                { name: '<:Pajzs:1237955468580618290> Fecha de Inicio', value: format(fechaInicioDate, 'PP'), inline: true },
                { name: '<:Pajzs:1237955468580618290> Fecha de Cambios', value: `Hasta ${format(fechaCambios, 'PP')}`, inline: true },
                { name: '<:Pajzs:1237955468580618290> Fecha de Soporte', value: `Hasta ${format(fechaSoporte, 'PP')}`, inline: true }
            )
            .setDescription('Esta garantía es provisional. Se te enviará un certificado oficial a través de este medio o nuestro sistema. La garantía incluye:\n- Soporte continuo durante y después de la finalización del proyecto.\n- Cambios y ajustes durante la primera semana después del despliegue.')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
