// ✅ Importa la función `body` desde express-validator
// Esta función permite crear reglas de validación sobre los campos enviados en `req.body`
import { body } from 'express-validator';

// ✅ Exporta un array llamado `validarPais`
// Este array contiene todas las validaciones necesarias para crear o editar un país
export const validarPais = [

  // 🔎 Valida el campo "name.official" (nombre oficial del país)
  body('name.official')
    .trim() // Elimina espacios en blanco al principio y al final del valor
    .notEmpty().withMessage('El nombre oficial es obligatorio') // No puede estar vacío
    .isLength({ min: 3, max: 90 }).withMessage('Debe tener entre 3 y 90 caracteres'), // Largo mínimo y máximo permitido

  // 🔎 Valida el campo "capital"
  body('capital')
    .notEmpty().withMessage('La capital es obligatoria') // Campo requerido
    .custom(value => { // Validador personalizado           // es el valor que llega desde el formulario, por ejemplo: value = "ARG,BRA,CHL"
      const capitales = value.split(','); // Divide por comas en caso de múltiples capitales
      return capitales.every(c => c.trim().length >= 3 && c.trim().length <= 90); // Cada capital debe tener entre 3 y 90 caracteres        //
    }).withMessage('Cada capital debe tener entre 3 y 90 caracteres'),

  // 🔎 Valida el campo "borders" (fronteras con otros países)
  body('borders')
    .optional() // Este campo no es obligatorio
    .custom(value => { // Validador personalizado(custom permite crear una validacion personalizada )
      const fronteras = value.split(','); // Divide por comas                 value.split(',') Convierte esa cadena en un array  ['ARG', 'BRA', 'CHL'] TRUE
      return fronteras.every(b => /^[A-Z]{3}$/.test(b.trim())); // Cada frontera debe tener exactamente 3 letras mayúsculas (ej: ARG, BRA)  (every es un metodo de los arrays) devuelve true si todas cumplen
    })                                            //b.trim Elimina espacios en blanco al inicio y al final de cada string (por si el usuario puso espacios como " ARG ").
    .withMessage('Cada frontera debe tener exactamente 3 letras mayúsculas'),

  // 🔎 Valida el campo "area"
  body('area')
    .notEmpty().withMessage('El área es obligatoria') // Campo obligatorio
    .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo mayor a 0'), // Debe ser un número decimal mayor que 0

  // 🔎 Valida el campo "population"
  body('population')
    .notEmpty().withMessage('La población es obligatoria') // Campo obligatorio
    .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo'), // Debe ser un número entero > 0         
    //  gt: 0 significa "greater than 0" → tiene que ser mayor a cero. Valida que el valor sea un número entero (isInt = is Integer).



  // 🔎 Valida el campo "timezones"
  body('timezones')
    .notEmpty().withMessage('La zona horaria es obligatoria') // Campo obligatorio
];
