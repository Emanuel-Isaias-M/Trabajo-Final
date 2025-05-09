// ✅ Importa Express para poder usar el enrutador
import express from 'express';

// ✅ Importa los controladores que contienen la lógica para obtener, agregar, editar y eliminar países
import {
  obtenerPaises,
  agregarPais,
  editarPais,
  eliminarPais
} from '../controllers/paisesController.mjs';

// ✅ Importa las reglas de validación que se aplican antes de crear o editar un país
import { validarPais } from '../validation/paisValidation.mjs';

// ✅ Reutiliza el middleware que ya tenés, que devuelve errores en formato JSON
import { manejarErroresValidacion } from '../validation/manejarErroresApi.mjs';

// ✅ Crea un enrutador para definir las rutas de la API REST (respuestas en formato JSON)
const router = express.Router();

// ===============================
// 📥 OBTENER TODOS LOS PAÍSES (JSON)
// ===============================
router.get('/', async (req, res) => {
  try {
    const paises = await obtenerPaises(req, res, true);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los países', error });
  }
});

// ===============================
// ➕ CREAR UN NUEVO PAÍS (JSON)
// ===============================
router.post('/', validarPais, manejarErroresValidacion, async (req, res) => {
  try {
    const pais = await agregarPais(req, res, true);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar país', error });
  }
});

// ===============================
// ✏️ EDITAR UN PAÍS EXISTENTE (JSON)
// ===============================
router.put('/:id', validarPais, manejarErroresValidacion, async (req, res) => {
  try {
    const pais = await editarPais(req, res, true);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar país', error });
  }
});

// ===============================
// ❌ ELIMINAR UN PAÍS (JSON)
// ===============================
router.delete('/:id', async (req, res) => {
  try {
    const pais = await eliminarPais(req, res, true);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar país', error });
  }
});

// ✅ Exporta el enrutador para montarlo en /api/paises desde app.mjs
export default router;
