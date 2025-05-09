// ✅ Importa el modelo Mongoose del país
// Este modelo define cómo debe ser la estructura de cada país en la base de datos
import Pais from '../models/paisModel.mjs';

// ===============================
// 📥 FUNCIÓN: Obtener todos los países
// ===============================
// Retorna todos los documentos de la colección 'Grupo-01' (países)
// Se usa, por ejemplo, para listar los países en el dashboard o en la API
export async function obtenerTodos() {
    return await Pais.find(); // Sin filtros, devuelve todos los países
}

// ===============================
// ➕ FUNCIÓN: Insertar países
// ===============================
// Recibe un array de países ya formateados y los guarda en MongoDB
// Se usa en el flujo de importación automática desde la API externa
export async function insertarPais(paises) {
    console.log('Insertando países:', paises.length); // Log para verificar cuántos se están guardando
    return await Pais.insertMany(paises); // Inserta todos los documentos de una sola vez (bulk insert)
}

// ===============================
// ✏️ FUNCIÓN: Actualizar un país por ID
// ===============================
// Busca un país por su ID y lo actualiza con los datos nuevos
// `{ new: true }` asegura que se devuelva el documento actualizado, no el anterior
export async function actualizarPais(id, nuevosDatos) {
    return await Pais.findByIdAndUpdate(id, nuevosDatos, { new: true });
}

// ===============================
// ❌ FUNCIÓN: Eliminar un país por ID
// ===============================
// Busca y elimina un país por su ID
export async function eliminarPais(id) {
    return await Pais.findByIdAndDelete(id);
}

