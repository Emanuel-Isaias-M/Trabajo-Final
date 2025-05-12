// IPaisRepository.mjs
// ✅ Esta clase representa una interfaz abstracta de repositorio para países.
// No tiene implementación real: solo declara qué métodos deben existir.
// Sirve como contrato para que cualquier clase que la extienda
// implemente todos los métodos definidos acá.

export default class IPaisRepository {
  
  // 🌍 Método para obtener todos los países por creador
  // Debe devolver un array de países creados por un usuario
  async obtenerPorCreador(creador) {
    // ❌ Lanza error si no está implementado
    throw new Error('Método no implementado');
  }

  // ➕ Método para insertar un solo país
  // Se usa cuando agregás un país desde un formulario o una API
  async insertarUnPais(pais) {
    throw new Error('Método no implementado');
  }

  // 📥 Método para insertar múltiples países
  // Se usa cuando hacés una importación masiva desde una API externa
  async insertarPais(paises) {
    throw new Error('Método no implementado');
  }

  // ✏️ Método para actualizar un país
  // Recibe el ID, los nuevos datos y el creador (para validar autorización)
  async actualizarPais(id, datos, creador) {
    throw new Error('Método no implementado');
  }

  // ❌ Método para eliminar un país
  // Solo debe eliminar si el país pertenece al creador actual
  async eliminarPais(id, creador) {
    throw new Error('Método no implementado');
  }
}

