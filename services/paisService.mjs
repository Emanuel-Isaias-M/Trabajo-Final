// ✅ paisService.mjs

import * as PaisRepository from '../repositories/PaisRepository.mjs';

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
export async function editarPais(id, datos, creador) {
  const pais = {
    ...datos,
    capital: datos.capital?.split(',').map(c => c.trim()) || [],
    borders: datos.borders?.split(',').map(b => b.trim()) || [],
    timezones: datos.timezones?.split(',').map(t => t.trim()) || []
  };
  return await PaisRepository.actualizarPais(id, pais, creador);
}

// ❌ Eliminar un país por ID
export async function eliminarPais(id, creador) {
  return await PaisRepository.eliminarPais(id, creador);
}
