const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cotizacion-preguntas')
        .setDescription('Comienza el proceso de cotización para tu proyecto con nosotros.'),
    async execute(interaction) {
        const header = `@${interaction.user.username} | Bz Softwares`;
        const embed = new EmbedBuilder()
            .setColor(0x00BFFF)
            .setTitle('Bienvenido al proceso de cotización de Bz Softwares')
            .setDescription('¡Estamos emocionados de trabajar contigo! Para empezar, necesitamos algunos detalles sobre tu proyecto. Por favor, responde las siguientes preguntas para ayudarnos a entender mejor tus necesidades:\n\n1. **Objetivo del proyecto**: ¿Cuál es el propósito principal de tu proyecto?\n2. **Requerimientos generales**: Describe las características esenciales que tu proyecto necesita.\n3. **Ejemplos para entender la idea**: ¿Puedes proporcionar ejemplos similares?\n4. **¿Hasta dónde planeas llegar?**: Explica el alcance final deseado del proyecto.\n5. **¿Cuentas con diseños y logotipo?**: Indica si ya tienes estos elementos.\n6. **Hosting y dominio**: ¿Ya tienes hosting y dominio?\n7. **Tecnología específica**: ¿Hay alguna tecnología específica que requieras (opcional)?\n8. **Tiempo de entrega**: ¿Cuál es tu plazo esperado?\n9. **Presupuesto del proyecto**: ¿Cuál es tu presupuesto estimado para este proyecto?\n\nSi necesitas más información sobre nosotros o nuestros servicios antes de responder, puedes utilizar los comandos `/hola` y `/servicios`.')
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
