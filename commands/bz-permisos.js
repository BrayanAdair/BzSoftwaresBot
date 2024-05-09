const {
    SlashCommandBuilder,
    PermissionsBitField,
    roleMention,
    EmbedBuilder,
  } = require('discord.js');
  const { asignarPermisoARol } = require("../dataManager");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('bz-permisos')
      .setDescription('Asigna permisos predefinidos a un rol')
      .addRoleOption(option =>
        option
          .setName('rol')
          .setDescription('Selecciona el rol')
          .setRequired(true)
      )
      .addStringOption(option =>
        option
          .setName('permiso')
          .setDescription('Selecciona el permiso a asignar')
          .setRequired(true)
          .addChoices(
            { name: 'Vendedor', value: 'vendedor' },
            { name: 'Publicista', value: 'publicista' },
            { name: 'Programador', value: 'programador' },
            { name: 'Diseñador', value: 'diseñador' },
            { name: 'Staff', value: 'staff' }
          )
      ),
    async execute(interaction) {
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        await interaction.reply({
          content: 'No tienes permisos para usar este comando.',
          ephemeral: true,
        });
        return;
      }
  
      const rol = interaction.options.getRole('rol');
      const permiso = interaction.options.getString('permiso');
      const mention = roleMention(rol.id);
  
      try {
        asignarPermisoARol(interaction.guildId, rol.id, permiso);
  
        const embed = new EmbedBuilder()
          .setColor(0x00ae86)
          .setTitle('Permiso Asignado')
          .setDescription(`El rol ${mention} ahora tiene el permiso ${permiso}.`)
          .setTimestamp();
  
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error('Error al asignar permiso:', error);
        await interaction.reply({
          content: 'Ocurrió un error al procesar tu comando.',
          ephemeral: true,
        });
      }
    },
  };
  