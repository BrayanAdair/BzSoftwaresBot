const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { gpt } = require("gpti");
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
  ]
});

// Colección para almacenar los comandos
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Cargar cada comando y añadirlo a la colección de comandos
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Almacena los IDs de los canales donde el bot no debe responder
const ignoredChannels = new Set();

let history = [
    {
        role: "system",
        content: "Desde ahora eres un bot asistente de la Agencia de Software Bz Softwares. Bz Softwares ofrece servicios de desarrollo web, aplicaciones móviles, aplicaciones de escritorio, sistemas, APIs, PWA, CRM, SaaS, y asesoría de TI. Cada vez que alguien necesite ayuda o una cotización, debes responder que abran un ticket para que uno de nuestros vendedores los atienda."
    },
    {
        role: "assistant",
        content: "Hola, soy el bot asistente de Bz Softwares. ¿En qué puedo ayudarte hoy? Recuerda que si necesitas una cotización o asistencia más detallada, puedes abrir un ticket y uno de nuestros vendedores te atenderá."
    }
];

// Iniciar sesión con el token del bot
client.login(config.token);

client.on('ready', () => {
  console.log(`Se ha inicializado el bot: ${client.user.tag}`);
});

// Maneja las interacciones de comandos
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('Error al ejecutar el comando:', error);
    await interaction.reply({ content: 'Hubo un error al ejecutar ese comando.', ephemeral: true });
  }
});

// Maneja los mensajes de texto (no comandos)
client.on('messageCreate', async (message) => {
    // Ignora los mensajes de cualquier bot (incluido el propio bot)
    if (message.author.bot) return;

    // Aquí nos aseguramos de que la IA no responda a comandos de barra "/"
    if (message.content.startsWith('/')) return;

    const content = message.content;
    const channel = message.channel;

    // Verifica si el bot debe ignorar este canal
    if (ignoredChannels.has(channel.id)) {
        if (content.toLowerCase().includes("puedes continuar bot")) {
            ignoredChannels.delete(channel.id);
            await channel.send("¡He vuelto! Estoy listo para ayudarte de nuevo.");
        }
        return;
    }

    // Si el mensaje contiene "gracias yo me encargo", el bot dejará de responder en este canal
    if (content.toLowerCase().includes("gracias yo me encargo")) {
        ignoredChannels.add(channel.id);
        await channel.send("Entendido, me detendré en este canal. Si necesitas mi ayuda de nuevo, solo dime 'Puedes continuar Bot'.");
        return;
    }

    // Si no es un comando, pasar el mensaje a la IA
    try {
        history.push({ role: 'user', content });

        gpt.v1({
            messages: history,
            prompt: content,
            model: 'GPT-4',
            markdown: false
        }, async (err, data) => {
            if (err) {
                console.log("Error en la llamada a GPT: ", err);
            } else if (data && data.gpt) {
                const response = data.gpt;
                history.push({ role: 'assistant', content: response });
                await channel.send(response);
            } else {
                console.log("Respuesta inesperada de GPT: ", data);
            }
        });
    } catch (error) {
        console.error('Error al procesar la respuesta de la IA:', error);
    }
});