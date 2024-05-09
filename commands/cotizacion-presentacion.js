const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-presentacion')
        .setDescription('Proporciona tu nombre para personalizar la tarjeta de presentación.')
        .addStringOption(option => 
            option.setName('nombre')
                  .setDescription('Tu nombre')
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

        // Obtener los datos del comando
        const nombre = interaction.options.getString('nombre');
        const autor = interaction.user.username;
        const profile_img = interaction.user.displayAvatarURL();

        // Crear el Embed con el diseño original
        const embed = new EmbedBuilder()
            .setColor(0x00BFFF)
            .setTitle(`Hola, soy ${nombre}!`)
            .setDescription(`Seré el vendedor que te acompañará durante todo el proceso de desarrollo y cotización de tu proyecto. Estoy aquí para asegurarme de que todas tus necesidades sean atendidas y para ayudarte a alcanzar tus objetivos con éxito. ¡Espero poder trabajar contigo!`)
            .setAuthor({ name: `${autor}`, iconURL: profile_img })
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
