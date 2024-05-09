const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-felicidades')
        .setDescription('Agradece al cliente por elegir Bz Softwares.'),
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

        // Crear el Embed con el mensaje de agradecimiento
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('¡Gracias por elegir Bz Softwares!')
            .setDescription('Agradecemos profundamente tu confianza en nosotros. Nos comprometemos a respetar todas las garantías y te recomendamos acceder a sistema.bzsoftwares.com para consultar tu contrato de privacidad, las facturas pendientes y el estado de avance de tu servicio. Pronto recibirás las contraseñas para acceder a nuestro sistema.')
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
