// ✅ Importa el modelo Mongoose del país
// Este modelo define cómo debe lucir un documento de país en la base de datos
import Pais from '../models/paisModel.mjs';

// ✅ Importa la interfaz abstracta (IPaisRepository)
// Esta interfaz define qué métodos debe tener cualquier clase repositorio de países
// Sirve como contrato: obliga a mantener estructura y evita olvidos
import IPaisRepository from './IPaisRepository.mjs';

// ✅ Clase concreta que implementa el repositorio de países
// Extiende la interfaz y define la lógica real para comunicarse con MongoDB
class PaisRepository extends IPaisRepository {
  
  // 🌍 Obtener todos los países creados por un usuario, con área mayor o igual a 1
  async obtenerPorCreador(creador) {
    return await Pais.find({
      creador,               // Filtra por el creador
      area: { $gte: 1 }      // Solo países con área mayor o igual a 1
    });
  }

  // ➕ Insertar un único país en la base de datos
  // Usado cuando se envía un formulario o una API agrega uno por uno
  async insertarUnPais(pais) {
    const nuevoPais = new Pais(pais);   // Crea una instancia del modelo con los datos
    return await nuevoPais.save();      // Guarda el documento en MongoDB
  }

  // 📥 Insertar múltiples países (bulk insert)
  // Se usa en la importación automática desde una API externa
  async insertarPais(paises) {
    console.log('Insertando países:', paises.length); // Loguea cuántos países se van a insertar
    return await Pais.insertMany(paises);             // Inserta todos los documentos en un solo paso
  }

  // ✏️ Actualizar un país por ID y creador (verificación de seguridad)
  // Evita que un usuario edite países que no le pertenecen
  async actualizarPais(id, nuevosDatos, creador) {
    return await Pais.findOneAndUpdate(
      {
        _id: id,           // Busca el país por su ID
        creador            // Asegura que solo el creador original pueda modificarlo
      },
      nuevosDatos,         // Datos ya procesados desde el servicio
      {
        new: true          // Devuelve el documento actualizado, no el anterior
      }
    );
  }

  // ❌ Eliminar un país por ID y creador (seguridad)
  // Solo se elimina si el país pertenece al creador actual
  async eliminarPais(id, creador) {
    return await Pais.findOneAndDelete({
      _id: id,             // Busca por ID
      creador              // Verifica propiedad del documento
    });
  }
}

// ✅ Exporta una única instancia de la clase
// Esto permite importar directamente y usar sus métodos como si fuera un objeto
export default new PaisRepository();
