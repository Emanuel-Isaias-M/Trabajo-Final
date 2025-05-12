// ✅ Importa Express para poder usar el enrutador
import express from 'express';

// ✅ Importa los controladores que contienen la lógica para obtener, agregar, editar y eliminar países
import { obtenerPaises, agregarPais, editarPais, eliminarPais } from '../controllers/paisesController.mjs';

// ✅ Importa el array de validaciones que se aplica antes de agregar o editar un país
import { validarPais } from '../validation/paisValidation.mjs';

// ⚠️ Importa el middleware que maneja los errores de validación
// Nota: el nombre del archivo sugiere que debería estar en una carpeta `middlewares`, pero se importa desde `validation`
import { manejarErroresValidacion } from '../validation/manejarErroresApi.mjs';

// ✅ Importa el modelo Mongoose para poder buscar un país por ID directamente desde la base de datos
import Pais from '../models/paisModel.mjs';

// ✅ Crea el enrutador para definir las rutas de vistas relacionadas a países
const router = express.Router();

// ===============================
// 🌐 RUTA PRINCIPAL (Dashboard)
// ===============================
// GET /dashboard → Muestra la lista de países en el dashboard
router.get('/', obtenerPaises);

// ===============================
// 📄 FORMULARIO PARA AGREGAR PAÍS
// ===============================
// GET /dashboard/agregar → Renderiza la vista del formulario para agregar un nuevo país
router.get('/agregar', (req, res) => {
  res.render('add', {
    errores: [], // No hay errores al iniciar
    datos: {}    // Datos vacíos al cargar el formulario
  });
});

// ===============================
// ✏️ FORMULARIO PARA EDITAR PAÍS
// ===============================
// GET /dashboard/editar/:id → Renderiza el formulario de edición con los datos cargados del país seleccionado
router.get('/editar/:id', async (req, res) => {
  // 🔍 Busca el país por su ID en MongoDB
  const pais = await Pais.findById(req.params.id);

  // ❌ Si no se encuentra el país, se devuelve un error 404
  if (!pais) return res.status(404).send('País no encontrado');

  // 🛠️ Prepara los datos para rellenar el formulario con los valores actuales del país
  const datos = {
    _id: pais._id,
    'name.official': pais.name?.official || '',
    'name.common': pais.name?.common || '',
    capital: pais.capital?.join(', ') || '',
    borders: pais.borders?.join(', ') || '',
    area: pais.area || '',
    population: pais.population || '',
    timezones: pais.timezones?.join(', ') || ''
  };

  // 🖼️ Renderiza la vista edit.ejs con los datos del país
  res.render('edit', {
    errores: [], // Inicialmente sin errores
    datos
  });
});

// ===============================
// ✅ AGREGAR NUEVO PAÍS
// ===============================
// POST /dashboard → Agrega un nuevo país a la base de datos
// 1. validarPais → Aplica las reglas de validación
// 2. manejarErroresValidacion → Si hay errores, responde con ellos
// 3. agregarPais → Si está todo bien, lo guarda en MongoDB
router.post('/', validarPais, manejarErroresValidacion, agregarPais);

// ===============================
// 🔄 EDITAR UN PAÍS EXISTENTE
// ===============================
// PUT /dashboard/:id → Edita un país que ya existe
// Aplica las mismas validaciones que al crear
router.put('/editar/:id', validarPais, manejarErroresValidacion, editarPais);

// ===============================
// ❌ ELIMINAR UN PAÍS
// ===============================
// DELETE /dashboard/:id → Elimina el país indicado por ID
router.delete('/:id', eliminarPais);

// ✅ Exporta el enrutador para usarlo en `app.mjs`
export default router;




