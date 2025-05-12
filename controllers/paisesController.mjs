// ✅ Importa los servicios con alias para evitar conflictos
import {
  obtenerPaisesPorCreador,
  crearPais as crearPaisService,
  editarPais as editarPaisService,
  eliminarPais as eliminarPaisService
} from '../services/paisService.mjs';

import * as PaisAPIService from '../services/paisAPIService.mjs';

// ✅ Define el nombre del creador por defecto
const CREADOR = 'Isaias';

// 🌍 Obtener todos los países
export async function obtenerPaises(req, res, api = false) {
  try {
    const paises = await obtenerPaisesPorCreador(CREADOR);

    if (api === true) {
      return res.json({ paises });
    }

    res.render('dashboard', { paises });
  } catch (error) {
    console.error('Error en obtenerPaises:', error);
    res.status(500).json({ mensaje: 'Error al obtener países', error: error.message });
  }
}

// ➕ Agregar país
export async function agregarPais(req, res) {
  try {
    const pais = await crearPaisService(req.body, CREADOR);

    if (req.headers.accept !== 'application/json') {
      return res.redirect('/dashboard');
    }

    return res.status(201).json({
      mensaje: 'País creado correctamente',
      pais
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al agregar país', error });
  }
}

// ✏️ Controlador: Editar país existente
export async function editarPais(req, res) {
  try {
    // 🧠 Llama al servicio para procesar los datos y actualizar el país en MongoDB
    // req.params.id = ID del país (desde la URL)
    // req.body = datos enviados desde el formulario
    // CREADOR = nombre del usuario que está editando
    const pais = await editarPaisService(req.params.id, req.body, CREADOR);

    // ❌ Si no se encontró el país o no le pertenece al usuario, devuelve error 404
    if (!pais) {
      return res.status(404).json({ mensaje: 'País no encontrado o no autorizado' });
    }

    // 🌐 Si no es una API (es un formulario HTML), redirige al dashboard
    if (req.headers.accept !== 'application/json') {
      return res.redirect('/dashboard');
    }

    // ✅ Si es una API, responde con un JSON indicando éxito y devuelve el país actualizado
    return res.json({
      mensaje: 'País actualizado correctamente',
      pais
    });

  } catch (error) {
    // 💥 Si ocurre un error inesperado, responde con error 500 y el mensaje
    return res.status(500).json({ mensaje: 'Error al editar país', error });
  }
}


// ❌ Eliminar país
export async function eliminarPais(req, res, api = false) {
  try {
    const eliminado = await eliminarPaisService(req.params.id, CREADOR);

    if (!eliminado) {
      return res.status(404).json({ mensaje: 'País no encontrado o no autorizado' });
    }

    if (api) {
      return res.json({ mensaje: 'País eliminado correctamente' });
    }

    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar país', error });
  }
}

// 🌐 Obtener desde API externa
export async function obtenerYGuardarPaises(req, res) {
  try {
    await PaisAPIService.obtenerYGuardarPaises();
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener y guardar los países', error });
  }
}