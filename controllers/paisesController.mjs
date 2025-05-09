// ✅ Importa el modelo Mongoose del país para interactuar con MongoDB
import Pais from '../models/paisModel.mjs';

// ✅ Importa el servicio que se encarga de traer y guardar países desde una API externa
import * as PaisAPIService from '../services/paisAPIService.mjs';

// ✅ Define el nombre del creador por defecto, se usará para identificar los países del usuario
const CREADOR = 'Isaias';


// ===========================
// 🌍 Obtener todos los países
// ===========================
export async function obtenerPaises(req, res, api = false) {
  try {
    // 🔍 Busca todos los países que tengan creador = Isaias y área mayor o igual a 1
    const paises = await Pais.find({
      creador: CREADOR,
      area: { $gte: 1 }
    });

    // ✅ Si es una solicitud de API (api = true), devuelve los datos como JSON
    if (api === true) {
      return res.json({ paises });
    }

    // ✅ Si no, se asume que es una solicitud para renderizar una vista HTML (dashboard)
    res.render('dashboard', { paises });
  } catch (error) {
    // ⚠️ En caso de error, siempre responde con JSON para debug
    res.status(500).json({ mensaje: 'Error al obtener países', error });
  }
}


// ===========================
// ➕ Agregar un nuevo país
// ===========================
export async function agregarPais(req, res) {
  // 🧾 Extrae los datos enviados desde el formulario o JSON
  const { name, capital, borders, area, population, timezones } = req.body;

  try {
    // 📦 Crea un nuevo objeto País usando los datos recibidos
    const paisNuevo = new Pais({
      name,
      capital: capital?.split(',').map(c => c.trim()) || [],
      borders: borders?.split(',').map(b => b.trim()) || [],
      area,
      population,
      timezones: timezones?.split(',').map(t => t.trim()) || [],
      creador: CREADOR // 🧠 Añade el nombre del creador
    });

    // 💾 Guarda el país en la base de datos
    const guardado = await paisNuevo.save();

    // 🔄 Si fue una solicitud desde el navegador, redirecciona al dashboard
    if (req.headers.accept !== 'application/json') {
      return res.redirect('/dashboard');
    }

    // ✅ Si fue una solicitud de API, responde en JSON
    return res.status(201).json({
      mensaje: 'País creado correctamente',
      pais: guardado
    });

  } catch (error) {
    // ⚠️ En caso de error, responde con JSON
    return res.status(500).json({
      mensaje: 'Error al agregar país',
      error
    });
  }
}


// ===========================
// ✏️ Editar un país existente
// ===========================
export async function editarPais(req, res) {
  // 🔍 Extrae el ID del país a editar desde la URL
  const { id } = req.params;
  // 🧾 Extrae los nuevos datos del request
  const { name, capital, borders, area, population, timezones } = req.body;

  try {
    // 🔎 Verifica si el país existe y pertenece al creador
    const paisActual = await Pais.findOne({ _id: id, creador: CREADOR });
    if (!paisActual) {
      return res.status(404).json({ mensaje: 'País no encontrado o no autorizado' });
    }

    // ♻️ Actualiza el país con los nuevos datos
    const actualizado = await Pais.findOneAndUpdate(
      { _id: id, creador: CREADOR },
      {
        name,
        capital: capital?.split(',').map(c => c.trim()) || [],
        borders: borders?.split(',').map(b => b.trim()) || [],
        area,
        population,
        timezones: timezones?.split(',').map(t => t.trim()) || []
      },
      { new: true } // ✅ Devuelve el documento actualizado
    );

    // 🔄 Si no es una API, redirige
    if (req.headers.accept !== 'application/json') {
      return res.redirect('/dashboard');
    }

    // ✅ Si es una API, responde en JSON
    return res.json({
      mensaje: 'País actualizado correctamente',
      pais: actualizado
    });

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al editar país', error });
  }
}


// ===========================
// ❌ Eliminar un país
// ===========================
export async function eliminarPais(req, res, api = false) {
  const { id } = req.params;

  try {
    // 🗑️ Elimina el país si pertenece al creador
    const paisEliminado = await Pais.findOneAndDelete({ _id: id, creador: CREADOR });

    if (!paisEliminado) {
      return res.status(404).json({ mensaje: 'País no encontrado o no autorizado' });
    }

    // ✅ Si es API, responde con JSON
    if (api) {
      return res.json({ mensaje: 'País eliminado correctamente' });
    } else {
      // 🔄 Si no, redirecciona al dashboard
      res.redirect('/dashboard');
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar país', error });
  }
}


// ===========================
// 🌐 Obtener desde API externa
// ===========================
export async function obtenerYGuardarPaises(req, res) {
  try {
    // 🔁 Ejecuta el flujo que trae países desde la API y los guarda en MongoDB
    await PaisAPIService.obtenerYGuardarPaises();
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener y guardar los países', error });
  }
}

