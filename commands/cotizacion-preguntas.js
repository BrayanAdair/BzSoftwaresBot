const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-preguntas')
        .setDescription('Comienza el proceso de cotización para tu proyecto con nosotros.'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const datosServidor = obtenerDatosDeServidor(guildId);

        // Añadir comprobaciones aquí
        if (!datosServidor || !datosServidor.roles || Object.keys(datosServidor.roles).length === 0) {
            await interaction.reply({ content: 'No hay permisos configurados en este servidor.', ephemeral: true });
            return;
        }

        // Busca el rol asociado al permiso "vendedor"
        const rolVendedor = Object.keys(datosServidor.roles).find(
            roleId => datosServidor.roles[roleId] === 'vendedor'
        );

        if (!rolVendedor) {
            await interaction.reply({
                content: 'No se encontró el permiso de "vendedor" en la configuración del servidor.',
                ephemeral: true,
            });
            return;
        }

        // Verifica si el usuario tiene el rol asociado
        const tienePermiso = interaction.member.roles.cache.has(rolVendedor);

        if (!tienePermiso) {
            await interaction.reply({
                content: '<a:alert:1231002131050266717> Solo los vendedores pueden acceder a este comando, lo sentimos.',
                ephemeral: true,
            });
            return;
        }

        const embed = new EmbedBuilder()
        .setColor(0x00BFFF)
        .setTitle('Bienvenido al proceso de cotización de Bz Softwares')
        .setDescription(
            `¡Estamos emocionados de trabajar contigo! Para empezar, necesitamos algunos detalles sobre tu proyecto. Por favor, responde las siguientes preguntas para ayudarnos a entender mejor tus necesidades:\n\n` +
            `1. **Objetivo del proyecto**: ¿Cuál es el propósito principal de tu proyecto?\n` +
            `2. **Requerimientos generales**: Describe las características esenciales que tu proyecto necesita.\n` +
            `3. **Ejemplos para entender la idea**: ¿Puedes proporcionar ejemplos similares?\n` +
            `4. **¿Hasta dónde planeas llegar?**: Explica el alcance final deseado del proyecto.\n` +
            `5. **¿Cuentas con diseños y logotipo?**: Indica si ya tienes estos elementos.\n` +
            `6. **Hosting y dominio**: ¿Ya tienes hosting y dominio?\n` +
            `7. **Tecnología específica**: ¿Hay alguna tecnología específica que requieras (opcional)?\n` +
            `8. **Tiempo de entrega**: ¿Cuál es tu plazo esperado?\n` +
            `9. **Presupuesto del proyecto**: ¿Cuál es tu presupuesto estimado para este proyecto?\n\n` +
            `Si necesitas más información sobre nosotros o nuestros servicios antes de responder, puedes utilizar los comandos \`/hola\` y \`/servicios\`.`
        )
        .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
        .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
        .setTimestamp();


        await interaction.reply({ embeds: [embed] });
    },
};
