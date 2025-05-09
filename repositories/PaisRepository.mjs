// ✅ Importa el modelo Mongoose del país
import Pais from '../models/paisModel.mjs';

// ✅ Obtener países filtrados por creador y área mínima
export async function obtenerPorCreador(creador) {
  return await Pais.find({
    creador,
    area: { $gte: 1 }
  });
}

// ✅ Insertar un único país (usado al agregar desde formulario o API)
export async function insertarUnPais(pais) {
  const nuevoPais = new Pais(pais);
  return await nuevoPais.save();
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

// ✅ Actualizar un país por ID y creador (para seguridad)
export async function actualizarPais(id, nuevosDatos, creador) {
  return await Pais.findOneAndUpdate(
    { _id: id, creador }, // Asegura que solo se actualicen países del creador
    nuevosDatos,
    { new: true } // Devuelve el país actualizado
  );
}

// ✅ Eliminar un país por ID y creador (para seguridad)
export async function eliminarPais(id, creador) {
  return await Pais.findOneAndDelete({ _id: id, creador });
}

