const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-credenciales')
        .setDescription('Envía credenciales de acceso al sistema Bz Softwares.')
        .addStringOption(option =>
            option.setName('correo')
                .setDescription('Correo del cliente')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('contraseña')
                .setDescription('Contraseña del cliente')
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

        const correo = interaction.options.getString('correo');
        const contraseña = interaction.options.getString('contraseña');

        // Crear el Embed con las credenciales
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Tus credenciales de acceso a nuestro sistema')
            .setDescription(`Correo: ${correo}\nContraseña: ${contraseña}`)
            .setTimestamp()
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

        // Crear botón de acceso
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Accede a nuestro sistema')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://sistema.bzsoftwares.com')
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
