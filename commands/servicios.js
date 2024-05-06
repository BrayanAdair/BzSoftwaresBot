const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servicios')
        .setDescription('Algunos de nuestros servicios.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0xFA1845)
            .setTitle('Servicios Bz Softwares')
            .setDescription('**Selecciona una categoria**.\n\nPuedes ver mas detalles de nuestras categorias de servicios seleccionandola abajo tales como:\n\n Desarrollo Web, Desarrollo Móvil, Desarrollo Monolítico, DevOps, Cloud Computing y Otros')
            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
            .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlt6epshvE9T9553JYj6nSfIJmqCECPTLJu1bYBov&s")
            .setTimestamp()
            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });

        const menuRow = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select-category')
                    .setPlaceholder('SELECCIONA UN TIPO DE SERVICIO')
                    .addOptions([
                        {
                            label: 'Desarrollo web',
                            description: 'Servicios de webs.',
                            value: 'web',
                        },
                        {
                            label: 'Desarrollo Movil',
                            description: 'Servicios de apps.',
                            value: 'movil',
                        },
                        {
                            label: 'Desarrollo de Escritorio',
                            description: 'Servicios monoliticos.',
                            value: 'escritorio',
                        },
                        {
                            label: 'Dev Ops',
                            description: 'Servicios de desarrollo y practicas TI.',
                            value: 'devops',
                        },
                        {
                          label: 'Cloud Computing',
                          description: 'Servicios Enfocados en la nube.',
                          value: 'cloud',
                        },
                        {
                          label: 'OutSorcing',
                          description: 'Servicios Enfocados en subcontrataciones.',
                          value: 'outsorcing',
                        },
                        {
                          label: 'Otros',
                          description: 'Otros de Nuestros Servicios.',
                          value: 'otros',
                        },
                    ])
            );

        await interaction.reply({ embeds: [embed], components: [menuRow], ephemeral: false });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });
        collector.on('collect', async i => {
            if (i.isStringSelectMenu()) {
                let categoryEmbed;
                switch (i.values[0]) {
                    case 'web':
                        categoryEmbed = new EmbedBuilder()
                            .setColor(0x34a1eb)
                            .setTitle('Servicios de desarrollo Web')
                            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
                            .setDescription('Algunos de nuestros desarrollos web, puedes pedir mas informacion abriendo un ticket.')
                            .addFields(
                                { name: 'Páginas Web', value: ' \`Este servicio se centra en el diseño y desarrollo de sitios web estáticos y dinámicos, adaptados a las necesidades del cliente. Esto puede incluir sitios web corporativos, blogs, portafolios, entre otros.\`' },
                                { name: 'Tiendas Online', value: ' \`Este servicio implica la creación de tiendas en línea completas, que permiten a los clientes navegar por los productos, añadirlos a un carrito de compras y realizar pagos de forma segura.\`' },
                                { name: 'Landing Pages', value: ' \`Ofreces productos o servicios pero no es una tienda online, podemos ayudarte a desarrollar tu sitio perfecto.\`' },
                                { name: 'Plataformas E-learning', value: ' \`Este servicio se ocupa del desarrollo de plataformas de aprendizaje en línea. Estas plataformas pueden incluir funciones como la gestión de cursos, la entrega de contenido, las pruebas y exámenes, y el seguimiento del progreso del estudiante.\`' },
                                { name: 'Sistemas Web', value: ' \` Este servicio implica el desarrollo de aplicaciones web complejas, como sistemas de gestión de contenido (CMS), sistemas de gestión de relaciones con los clientes (CRM), y otras aplicaciones empresariales..\`' },
                                { name: 'Proyectos Personalizados', value: ' \`Este servicio ofrece soluciones de desarrollo web personalizadas basadas en las necesidades específicas del cliente. Esto puede incluir la creación de aplicaciones web únicas, la integración con sistemas existentes, la implementación de características especiales y mucho más.\`' },
                                // Añade más comandos de esta categoría
                            )
                            // .setImage("https://media.discordapp.net/attachments/1093625053763088445/1100240930478506055/60BA5C68-E954-4DE2-B772-A74CAB9EA8E4.jpg?ex=66324bf7&is=6630fa77&hm=a8cfe0c20b79ded0c64d348e96f2ee4a5d7b6cd8e417c56b8d0cb9b3aac55ac0&")
                            .setTimestamp()
                            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });
                            
                        break;
                    case 'movil':
                        categoryEmbed = new EmbedBuilder()
                            .setColor(0x34a1eb)
                            .setTitle('Servicios de desarrollo Móvil')
                            .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
                            // .setImage("https://media.discordapp.net/attachments/1093625053763088445/1100240504244936765/6EEFCD3F-C091-4AFE-BDC7-3E8E8B85DE39.jpg?ex=66324b91&is=6630fa11&hm=df7a7d7dac82bfa126a12e8aa63c44f7e9cd80036f56b0383f5ca06eca42bfa0&")
                            .addFields(
                                { name: 'Aplicaciones Nativas', value: ' \`Este servicio se centra en el desarrollo de aplicaciones móviles nativas, que están diseñadas y optimizadas para un sistema operativo específico, como iOS o Android. Las aplicaciones nativas pueden aprovechar todas las características del dispositivo y ofrecer una experiencia de usuario fluida y de alta calidad.\`' },
                                { name: 'Diseño de Interfaces', value: ' \`Este servicio implica la creación de interfaces de usuario atractivas y fáciles de usar para aplicaciones móviles. El diseño de la interfaz puede incluir la elección de colores, la disposición de los elementos en la pantalla, la creación de iconos y gráficos, y la optimización de la experiencia del usuario.\`' },
                                { name: 'Mejora de aplicacion', value: ' \`Este servicio implica creacion de servicios y mejora del procesamiento de datos en una aplicacion hecha.\`' },
                                { name: 'Proyectos personalizados', value: ' \`Este servicio ofrece soluciones de desarrollo móvil personalizadas basadas en las necesidades específicas del cliente. Esto puede incluir el desarrollo de aplicaciones móviles únicas, la integración con sistemas existentes, la implementación de características especiales y mucho más.\`' },
                            )
                            .setTimestamp()
                            .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });
                        break;
                        case 'escritorio':
                            categoryEmbed = new EmbedBuilder()
                                .setColor(0x34a1eb)
                                .setTitle('Servicios de desarrollo de Escritorio')
                                .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
                                // .setImage("https://media.discordapp.net/attachments/1093625053763088445/1100240673971646534/85EED4C5-BA04-4A35-917E-912ED40CFB54.jpg?ex=6632f47a&is=6631a2fa&hm=281ee08a96c81c6aa83d068705df5c73e441ef3e405db8c7c2e27c27f727f8dd&")
                                .addFields(
                                    { name: 'Aplicaciones de escritorio estaticas y dinamicas', value: ' \`Este servicio se centra en el desarrollo de aplicaciones de software que se instalan y se ejecutan en computadoras de escritorio. Estas aplicaciones pueden ser multiplataforma y están diseñadas para interactuar directamente con el sistema operativo del usuario.\`' },
                                    { name: 'Sistemas instalables windows y linux multiplataforma', value: ' \`Este servicio implica la creación de software o aplicaciones que se pueden instalar y ejecutar en sistemas operativos Windows y Linux. Esto puede incluir la creación de instaladores personalizados, la configuración de dependencias y la garantía de compatibilidad con diferentes versiones de los sistemas operativos\`' },
                                    { name: 'Proyectos Personalizados', value: ' \` Este servicio ofrece soluciones de software personalizadas basadas en las necesidades específicas del cliente. Esto puede incluir el desarrollo de aplicaciones web, móviles o de escritorio, la integración de sistemas, la automatización de procesos y mucho más.\`' },
                                )
                                .setTimestamp()
                                .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });
                            break;
                        case 'devops':
                            categoryEmbed = new EmbedBuilder()
                                .setColor(0x34a1eb)
                                .setTitle('Servicios Dev Ops')
                                .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
                                // .setImage("https://media.discordapp.net/attachments/1110015222791553094/1176174689551397014/181311CA-4B75-44C9-92D5-2A263D41419A.jpg?ex=6633014a&is=6631afca&hm=edb63665aebd2fca2151860f17e0918ee34a7fb59f0de99262e265a270086488&")
                                .addFields(
                                    { name: 'Implementación de metodologías', value: ' \`Este servicio se centra en la adopción e implementación de metodologías de desarrollo y operaciones, como Agile, Scrum y DevOps, para mejorar la eficiencia y la calidad del software.\`' },
                                    { name: 'Deploys Apps', value: ' \`Este servicio se encarga de la implementación y el lanzamiento de aplicaciones en diferentes entornos, asegurando una transición suave desde el desarrollo hasta la producción.\`' },
                                    { name: 'Migración de servicios', value: ' \`Este servicio implica la transferencia de datos, aplicaciones y servicios de un entorno a otro, como la migración de un servidor local a la nube.\`' },
                                    { name: 'Testing IT', value: ' \`Este servicio incluye la realización de pruebas exhaustivas para garantizar la funcionalidad, el rendimiento y la seguridad de las aplicaciones y sistemas de TI.\`' },
                                    { name: 'Apis & Microservicios', value: ' \` Este servicio se centra en el desarrollo y la gestión de APIs y microservicios, que permiten la integración y la comunicación entre diferentes aplicaciones y servicios.\`' },
                                    { name: 'Análisis de datos', value: ' \`Este servicio implica la recopilación, el procesamiento y el análisis de datos para obtener información valiosa que pueda ayudar a tomar decisiones informadas.\`' },
                                    { name: 'Refactorizacion de codigo', value: ' \`Este servicio implica revision y correcion de codigo para mejorar su funcionamiento existente o agilizacion de procesos mediante la misma arquitectura y patron de diseño.\`' },
                                    { name: 'IoT', value: ' \`Este servicio se ocupa del desarrollo y la gestión de dispositivos y sistemas conectados a Internet, permitiendo la recopilación y el intercambio de datos en tiempo real.\`' },
                                )
                                .setTimestamp()
                                .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });
                            break;
                            case 'cloud':
                              categoryEmbed = new EmbedBuilder()
                                  .setColor(0x34a1eb)
                                  .setTitle('Servicios de Cloud Computing')
                                  .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
                                  // .setImage("https://media.discordapp.net/attachments/1093625053763088445/1100240673971646534/85EED4C5-BA04-4A35-917E-912ED40CFB54.jpg?ex=6632f47a&is=6631a2fa&hm=281ee08a96c81c6aa83d068705df5c73e441ef3e405db8c7c2e27c27f727f8dd&")
                                  .addFields(
                                      { name: 'Creacion y configuración de servidores VPS', value: ' \`Este servicio implica la configuración y administración de Servidores Privados Virtuales (VPS). Un VPS es un servidor virtual que el usuario puede utilizar como si fuera su propio servidor físico.\`' },
                                      { name: 'Bases de datos On Cloud', value: ' \`Este servicio se centra en la creación y gestión de bases de datos en la nube. Esto permite a los usuarios acceder y manipular sus datos desde cualquier lugar, y también ofrece ventajas como la escalabilidad y la redundancia.\`' },
                                      { name: 'Manejo de servicios Azure', value: ' \`Este servicio se centra en la creación y gestión de bases de datos en la nube. Esto permite a los usuarios acceder y manipular sus datos desde cualquier lugar, y también ofrece ventajas como la escalabilidad y la redundancia.\`' },
                                      { name: 'Manejo de servicios AWS', value: ' \`Este servicio se centra en la utilización de Amazon Web Services, una plataforma de servicios en la nube que ofrece soluciones de cómputo, almacenamiento, bases de datos, análisis, redes, móviles, desarrollador, administración, IoT, seguridad y aplicaciones empresariales.\`' },
                                      { name: 'Manejo de servicios Google Cloud', value: ' \`Este servicio implica la administración y utilización de Google Cloud Platform, una suite de servicios en la nube que ofrece soluciones de cómputo, almacenamiento, datos, análisis y machine learning.\`' },
                                      { name: 'Manejo de servicios Open Stack', value: ' \`Este servicio se ocupa de la administración y utilización de OpenStack, una plataforma de software de código abierto para servicios en la nube. OpenStack permite a los usuarios desplegar y gestionar grandes cantidades de cómputo, almacenamiento y recursos de red.\`' },
                                      
                                  )
                                  .setTimestamp()
                                  .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });
                              break;
                              case 'outsorcing':
                                categoryEmbed = new EmbedBuilder()
                                    .setColor(0x34a1eb)
                                    .setTitle('Servicios de Sub Contratacion')
                                    .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
                                    // .setImage("https://media.discordapp.net/attachments/1093625053763088445/1100240673971646534/85EED4C5-BA04-4A35-917E-912ED40CFB54.jpg?ex=6632f47a&is=6631a2fa&hm=281ee08a96c81c6aa83d068705df5c73e441ef3e405db8c7c2e27c27f727f8dd&")
                                    .addFields(
                                        { name: 'Planificación de Proyectos', value: ' \`Este servicio implica la definición de los objetivos del proyecto, la identificación de las tareas necesarias para alcanzar esos objetivos y la organización de esas tareas en un cronograma de trabajo.\`' },
                                        { name: 'Diseño de Arquitecturas', value: ' \`Este servicio se centra en la creación de arquitecturas de software robustas y escalables que soporten las necesidades del negocio y faciliten el desarrollo y mantenimiento del software.\`' },
                                        { name: 'Implementación de patrones de diseño', value: ' \`Este servicio implica la utilización de patrones de diseño probados para resolver problemas comunes de diseño de software, lo que puede mejorar la eficiencia del desarrollo y la calidad del software.\`' },
                                        { name: 'Despliegue de metodologías', value: ' \`Este servicio se ocupa de la implementación de metodologías de desarrollo de software, como Agile o DevOps, para mejorar la eficiencia y la calidad del proceso de desarrollo.\`' },
                                        { name: 'Modelado de Bases de datos', value: ' \`Este servicio implica la creación de modelos de datos que representen eficazmente la información que el software necesita almacenar y manipular.\`' },
                                        { name: 'Análisis de escalabilidad', value: ' \`Este servicio se centra en evaluar la capacidad del software para manejar un aumento en la carga de trabajo, como un mayor número de usuarios o transacciones.\`' },
                                        { name: 'Creative and Design por análisis de UX & UI', value: ' \` Este servicio implica la creación de diseños de interfaz de usuario atractivos y fáciles de usar, basados en un análisis cuidadoso de la experiencia del usuario (UX).\`' },
                                        { name: 'Mantenimiento de sistemas', value: ' \`Este servicio se ocupa de la actualización y mejora continua del software para corregir errores, añadir nuevas características y mejorar el rendimiento.\`' },
                                        { name: 'Refactorización de proyectos', value: ' \`Este servicio implica la reestructuración del código existente para mejorar su legibilidad, eficiencia y mantenibilidad, sin cambiar su comportamiento externo.\`' },
                                        { name: 'Correcciones de proyectos', value: ' \`Este servicio se centra en la identificación y corrección de errores en el software para asegurar su correcto funcionamiento.\`' },
                                        
                                    )
                                    .setTimestamp()
                                    .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });
                                break;
                                case 'otros':
                                  categoryEmbed = new EmbedBuilder()
                                      .setColor(0x34a1eb)
                                      .setTitle('Servicios de Sub Contratacion')
                                      .setThumbnail('https://media.licdn.com/dms/image/D560BAQGtw0e9JZ1qcg/company-logo_100_100/0/1707421880200/bz_softwares_logo?e=1722470400&v=beta&t=CyLENLIuQisoI1ydWyVKGAXKNrpdC-DZVk1GJFI4Ouo')
                                      // .setImage("https://media.discordapp.net/attachments/1093625053763088445/1100240673971646534/85EED4C5-BA04-4A35-917E-912ED40CFB54.jpg?ex=6632f47a&is=6631a2fa&hm=281ee08a96c81c6aa83d068705df5c73e441ef3e405db8c7c2e27c27f727f8dd&")
                                      .addFields(
                                          { name: 'Posicionamiento de marca', value: ' \`Este servicio se centra en mejorar la visibilidad y la reputación de tu marca en el mercado. Esto puede incluir la creación de una identidad de marca única, la construcción de relaciones con los clientes y la diferenciación de tu marca de la competencia.\`' },
                                          { name: 'SEM, SEO, SEA Y PPC', value: ' \`SEM (Search Engine Marketing): Este servicio implica el uso de técnicas de marketing para aumentar la visibilidad de tu sitio web en los resultados de los motores de búsqueda.\n SEO (Search Engine Optimization): Este servicio se centra en optimizar tu sitio web para que aparezca en los resultados de búsqueda orgánicos de los motores de búsqueda. \n SEA (Search Engine Advertising): Este servicio implica la compra de anuncios en los motores de búsqueda para aumentar la visibilidad de tu sitio web. \n PPC (Pay Per Click): Este servicio se centra en la publicidad en línea donde pagas cada vez que alguien hace clic en tu anuncio. \`' },
                                          { name: 'Creación de BOTS discord y telegram', value: ' \`Este servicio implica el desarrollo de bots para las plataformas de chat Discord y Telegram. Los bots pueden automatizar tareas, proporcionar información, interactuar con los usuarios y mucho más.\`' },
                                          { name: 'Otros', value: ' \`Si no has visto el servicio que necesitas y no sabes si lo ofrecemos te recomendamos abrir ticket para poder ayudarte decirte si el servicio se encuentra disponible por nosotros.\`' },
                                      )
                                      .setTimestamp()
                                      .setFooter({ text: 'Bz Softwares Bot', iconURL: 'https://media.licdn.com/dms/image/sync/D4E27AQGm6DJ4s8cnZw/articleshare-shrink_800/0/1711122163552?e=2147483647&v=beta&t=LMGL8bVjPGNIJlc-yeRrSl-1VQf6oYb4oWtW5bI_0rU' });
                                  break;
                }
                await i.update({ embeds: [categoryEmbed] });
            }
        });

        collector.on('end', () => {
            console.log('Tiempo para escoger una categoria de servicio finalizado.');
        });
    },
};
