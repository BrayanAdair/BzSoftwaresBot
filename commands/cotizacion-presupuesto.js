const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-presupuesto')
        .setDescription('Proporciona un presupuesto estimado para el proyecto.')
        .addNumberOption(option => 
            option.setName('cantidad')
                .setDescription('Cantidad del presupuesto')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('moneda')
                .setDescription('Tipo de moneda para el presupuesto')
                .setRequired(true)
                .addChoices(
                    { name: 'USD', value: 'USD' },
                    { name: 'MXN', value: 'MXN' }
                )),
    async execute(interaction) {
        const servidorId = interaction.guildId;
        const datosServidor = obtenerDatosDeServidor(servidorId);

        if (!datosServidor || !datosServidor.roles || Object.keys(datosServidor.roles).length === 0) {
            await interaction.reply({ content: 'Error en la configuración de roles del servidor.', ephemeral: true });
            return;
        }

        const vendedorRolId = Object.keys(datosServidor.roles).find(rol => datosServidor.roles[rol] === 'vendedor');

        if (!vendedorRolId || !interaction.member.roles.cache.has(vendedorRolId)) {
            await interaction.reply({ content: '<a:alert:1231002131050266717> Solo los vendedores pueden acceder a este comando, lo sentimos.', ephemeral: true });
            return;
        }

        const cantidad = interaction.options.getNumber('cantidad');
        const moneda = interaction.options.getString('moneda');

        const embed = new EmbedBuilder()
            .setColor(0x00BFFF)
            .setTitle('Estimación de Presupuesto para el Proyecto')
            .setDescription('Te proporcionamos un presupuesto estimado que refleja nuestra dedicación a ofrecer calidad y valor en cada proyecto. Aquí están las ventajas de trabajar con nosotros:')
            .addFields(
                { name: '<:Pajzs:1237955468580618290>  Enfoque Personalizado', value: 'Cada proyecto recibe una atención detallada y personalizada.', inline: true },
                { name: '<:Pajzs:1237955468580618290>  Tecnología de Vanguardia', value: 'Utilizamos las últimas tecnologías para garantizar resultados óptimos.', inline: true },
                { name: '<:Pajzs:1237955468580618290>  Soporte 6 meses', value: 'Ofrecemos soporte continuo durante y después de la finalización del proyecto.', inline: true },
                { name: '<:Pajzs:1237955468580618290> Deploy en hosting', value: 'Nos comprometemos a entregarte tu servicio funcional y desplegado en un hosting.', inline: true },
                { name: '<:Pajzs:1237955468580618290> 1 semana en cambios menores', value: 'Ofrecemos cambios menores como colores, tipograficas, textos, edicion de seccion sin que afecte la logica.', inline: true },
                { name: '<:Pajzs:1237955468580618290> Acceso a nuestras plataformas', value: 'Acceso a nuestras plataformas como nuestro sistema en donde veras el proceso de tu servicio asi como facilidades de pagos.', inline: true },
                { name: 'Presupuesto Propuesto', value: `<:shield_success22:1237955470870708245> **${cantidad} ${moneda}** \n\n`, inline: false }
            )
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
