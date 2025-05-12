// ✅ paisService.mjs

import PaisRepository from '../repositories/PaisRepository.mjs';

// 🌍 Obtener todos los países del creador
export async function obtenerPaisesPorCreador(creador) {
  return await PaisRepository.obtenerPorCreador(creador);
}

// ➕ Agregar un nuevo país
export async function crearPais(datos, creador) {
  const pais = {
    ...datos,
    capital: datos.capital?.split(',').map(c => c.trim()) || [],
    borders: datos.borders?.split(',').map(b => b.trim()) || [],
    timezones: datos.timezones?.split(',').map(t => t.trim()) || [],
    creador
  };
  return await PaisRepository.insertarUnPais(pais);
}

// ✏️ Editar un país por ID
// Esta función forma parte de la capa de servicio y se encarga de preparar
// los datos antes de enviarlos al repositorio para ser actualizados en MongoDB.

export async function editarPais(id, datos, creador) {
  // 🧠 Creamos un nuevo objeto 'pais' a partir de los datos enviados
  // Usamos el operador spread (...) para copiar todos los campos
  const pais = {
    ...datos,

    // 🏙️ Capital: si viene como string ("Buenos Aires, Córdoba"), lo convertimos a array
    // - split(',') lo transforma en ['Buenos Aires', ' Córdoba']
    // - map(...trim()) elimina los espacios: ['Buenos Aires', 'Córdoba']
    // - || [] asegura que, si no viene capital, quede como array vacío
    capital: datos.capital?.split(',').map(c => c.trim()) || [],

    // 🗺️ Borders: lo mismo, pero con códigos de países (ej: "ARG,BRA,CHL")
    borders: datos.borders?.split(',').map(b => b.trim()) || [],

    // ⏰ Timezones: también los transformamos en array si vienen como string separado por comas
    timezones: datos.timezones?.split(',').map(t => t.trim()) || []
  };

  // 💾 Llamamos a la función del repositorio para hacer la actualización real en la base de datos
  // Le pasamos el ID del país, el objeto ya procesado, y el creador (para validar que tenga permiso)
  return await PaisRepository.actualizarPais(id, pais, creador);
}


// ❌ Eliminar un país por ID
export async function eliminarPais(id, creador) {
  return await PaisRepository.eliminarPais(id, creador);
}
