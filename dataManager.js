const fs = require('fs');
const path = require('path');

const datosDeServidores = {};

function cargarDatosIniciales() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  const files = fs.readdirSync(dataDir);
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(dataDir, file);
      const rawData = fs.readFileSync(filePath);
      const guildId = file.replace('guild_', '').replace('.json', '');
      datosDeServidores[guildId] = JSON.parse(rawData);
    }
  });
}

function guardarDatosDeServidor(guildId) {
  const filePath = path.join(__dirname, 'data', `guild_${guildId}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(datosDeServidores[guildId], null, 2));
    console.log(`Datos guardados correctamente para el guild ${guildId}`);
  } catch (error) {
    console.error(`Error al guardar datos para el guild ${guildId}: ${error}`);
  }
}

function obtenerDatosDeServidor(guildId) {
  const filePath = path.join(__dirname, 'data', `guild_${guildId}.json`);
  if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(rawData);
  }
  return {}; // Retorna un objeto vacío si el archivo no existe
}



function asignarPermisoARol(guildId, roleId, permiso) {
  if (!datosDeServidores[guildId]) {
    datosDeServidores[guildId] = { roles: {}, usuarios: {} };
  }

  for (const key in datosDeServidores[guildId].roles) {
    if (datosDeServidores[guildId].roles[key] === permiso) {
      delete datosDeServidores[guildId].roles[key];
    }
  }

  datosDeServidores[guildId].roles[roleId] = permiso;
  guardarDatosDeServidor(guildId);
}

function obtenerPermisoDeRol(guildId, roleId) {
  if (datosDeServidores[guildId] && datosDeServidores[guildId].roles) {
    return datosDeServidores[guildId].roles[roleId] || null;
  }
  return null;
}

function obtenerRolPorPermiso(guildId, permisoBuscado) {
  if (datosDeServidores[guildId] && datosDeServidores[guildId].roles) {
    for (const [key, value] of Object.entries(datosDeServidores[guildId].roles)) {
      if (value === permisoBuscado) {
        return key;
      }
    }
  }
  return null;
}

cargarDatosIniciales();

module.exports = {
  asignarPermisoARol,
  obtenerPermisoDeRol,
  obtenerRolPorPermiso,
  obtenerDatosDeServidor,
};
