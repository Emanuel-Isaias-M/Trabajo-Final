// ✅ Importa la función validationResult desde express-validator
// Esta función se usa para obtener los errores que resultaron de validar los campos con middlewares como validarPais
import { validationResult } from 'express-validator';

// ✅ Define y exporta una función middleware llamada manejarErroresValidacion
// Esta función se coloca después de las validaciones y antes del controlador final
// Su objetivo es interceptar los errores de validación y devolverlos en un formato claro al cliente
export function manejarErroresValidacion(req, res, next) {
  // 🧠 Extrae los errores generados por los validadores anteriores en la ruta
  const errores = validationResult(req);

  // ❌ Si hay errores, se responde con un JSON que detalla cada uno
  if (!errores.isEmpty()) {
    return res.status(400).json({
      status: 'error',                     // Estado general de la respuesta
      message: 'Validación fallida',      // Mensaje genérico para el cliente
      errores: errores.array().map(err => ({ // Se convierte cada error a un formato personalizado
        campo: err.param,                 // El nombre del campo que falló la validación
        mensaje: err.msg                  // El mensaje específico definido en la validación
      }))
    });
  }

  // ✅ Si no hay errores, se continúa con el siguiente middleware o controlador
  next();
}
