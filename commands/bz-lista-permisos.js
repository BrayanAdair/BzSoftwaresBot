const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { obtenerDatosDeServidor } = require('../dataManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bz-lista-permisos')
        .setDescription('Muestra los permisos y roles configurados en este servidor'),
    async execute(interaction) {
        const datosServidor = obtenerDatosDeServidor(interaction.guildId);
        
        if (!datosServidor || !datosServidor.roles || Object.keys(datosServidor.roles).length === 0) {
            return interaction.reply({ content: 'No hay permisos configurados en este servidor.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Lista de Permisos')
            .setDescription('Roles y sus permisos configurados en este servidor:')
            .setTimestamp();

        for (const [roleId, permiso] of Object.entries(datosServidor.roles)) {
            const role = await interaction.guild.roles.fetch(roleId).catch(console.error);
            const roleName = role ? role.name : "Rol no encontrado";
            embed.addFields({ name: roleName, value: permiso, inline: true });
        }

        await interaction.reply({ embeds: [embed] });
    },
};
