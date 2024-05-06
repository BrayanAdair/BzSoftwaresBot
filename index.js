const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json'); 
// Inicializa el cliente de Discord con los intents necesarios
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.MessageContent
    // Añadir otros intents según las necesidades específicas del bot
  ]
});
// Colección para almacenar los comandos
client.commands = new Collection();
const commands = []; // Array para almacenar los datos de los comandos para el registro
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Cargar cada comando y añadirlo a la colección de comandos
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data) {
    commands.push(command.data);
    client.commands.set(command.data.name, command);
  }
}
// Iniciar sesión con el token del bot
client.login(config.token);
client.on('ready', async () => {
  const CLIENT_ID = client.user.id;
  const rest = new REST({ version: '9' }).setToken(config.token);
  client.user.setActivity('bzsoftwares.com');
  try {
    console.log('Comenzó a actualizar los comandos de la aplicación (/).');
    // Actualizar comandos en el servidor
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );
    console.log('Comandos de aplicación (/) recargados correctamente.');
  } catch (error) {
    console.error(error);
  }
  console.log(`Se ha inicializado el bot: ${client.user.tag}`);
});
// Manejar las interacciones de comandos
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
  }
});
