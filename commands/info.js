const { EmbedBuilder, SlashCommandBuilder, channelMention, userMention } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Enviar un mensaje de alerta a un canal específico.')
        .addChannelOption(option => 
            option.setName('canal')
                .setDescription('Canal al que se enviará el mensaje')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a mencionar en el mensaje')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Mensaje de alerta a enviar')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('ping')
                .setDescription('Tipo de ping a usar')
                .setRequired(true)
                .addChoices(
                    { name: 'Here', value: '@here' },
                    { name: 'Everyone', value: '@everyone' }
                )),
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

        const canal = interaction.options.getChannel('canal');
        const usuario = interaction.options.getUser('usuario');
        const mensaje = interaction.options.getString('mensaje');
        const ping = interaction.options.getString('ping');

        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Mensaje de Bz Softwares Bot')
            .setDescription(mensaje)
            .addFields(
                { name: 'Para el Usuario:', value: `||${userMention(usuario.id)}||`, inline: true }
            )
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await canal.send({ embeds: [embed], content: `||${ping}||` });
        await interaction.reply({ content: `Mensaje enviado a ${channelMention(canal.id)}`, ephemeral: true });
    }
};
