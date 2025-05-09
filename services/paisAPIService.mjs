// ✅ Importa node-fetch para hacer peticiones HTTP desde Node.js, como si fuera fetch del navegador
import fetch from 'node-fetch';

// ✅ Importa todas las funciones del repositorio de países
// Este archivo se encarga de guardar los datos en MongoDB
import * as PaisRepository from "../repositories/PaisRepository.mjs";

// 🔁 Función para obtener todos los países desde la API externa (restcountries.com)
export async function obtenerPaisesDeAPI() {
    try {
        // 🌐 Realiza una petición GET a la API que devuelve información de todos los países
        const response = await fetch('https://restcountries.com/v3.1/all');

        // 🔄 Convierte la respuesta a formato JSON (devuelve un array de objetos país)
        return await response.json();
    } catch (error) {
        // ⚠️ Si ocurre un error (por ejemplo, no hay conexión), se muestra en consola y se lanza la excepción
        console.error('Error al obtener los países de la API:', error);
        throw error;
    }
}

// 🌍 Función que filtra los países que tienen como idioma el español
export function filtrarPaisesEnEspanol(paises) {
    return paises.filter(pais =>
        pais.languages && Object.keys(pais.languages).includes('spa') // Verifica si el idioma 'spa' (español) está en el objeto languages
    );
}

// 💾 Función que guarda los países filtrados en la base de datos (MongoDB)
export async function guardarPaises(paises) {
    // 🔄 Mapea los países para darles el formato que espera el modelo de Mongoose (paisModel.mjs)
    const paisesFormateados = paises.map(pais => ({
        name: pais.name || {},                        // Nombre común, oficial y nativo
        independent: pais.independent || false,       // Si es independiente
        status: pais.status || 'unknown',             // Estado del país (ej: assigned)
        unMember: pais.unMember || false,             // Si es miembro de la ONU
        currencies: pais.currencies || {},            // Monedas oficiales
        capital: pais.capital || [],                  // Capital o capitales
        region: pais.region || '',                    // Región general (ej: Americas)
        subregion: pais.subregion || '',              // Subregión (ej: South America)
        languages: pais.languages || {},              // Idiomas hablados
        latlng: pais.latlng || [],                    // Coordenadas geográficas
        landlocked: pais.landlocked || false,         // Si no tiene salida al mar
        borders: pais.borders || [],                  // Países con los que limita
        area: pais.area || 0,                         // Superficie en km²
        flag: pais.flag || '',                        // Emoji o ícono de bandera
        maps: pais.maps || {},                        // URLs de mapas
        population: pais.population || 0,             // Número de habitantes
        // gini: pais.gini || {},                     // (opcional) índice de desigualdad
        fifa: pais.fifa || '',                        // Código FIFA (ej: ARG)
        timezones: pais.timezones || [],              // Zonas horarias
        continents: pais.continents || [],            // Continente/s donde está ubicado
        flags: pais.flags || {},                      // URLs de las banderas (SVG, PNG)
        startOfWeek: pais.startOfWeek || '',          // Día en que empieza la semana
        capitalInfo: pais.capitalInfo || {},          // Información extra de la capital
        creador: 'Isaias'                             // Marca que vos lo creaste/importaste
    }));

    // 📥 Inserta los países en la base de datos usando el repositorio
    return await PaisRepository.insertarPais(paisesFormateados);
}

// 🔁 Función principal que ejecuta todo el proceso:
// 1. Obtener países de la API
// 2. Filtrar los que hablan español
// 3. Guardarlos en MongoDB
export async function obtenerYGuardarPaises() {
    try {
        const paises = await obtenerPaisesDeAPI(); // Paso 1: Obtener todos los países desde la API
        const paisesEnEspanol = filtrarPaisesEnEspanol(paises); // Paso 2: Filtrar solo los hispanohablantes
        return await guardarPaises(paisesEnEspanol); // Paso 3: Guardarlos en MongoDB
    } catch (error) {
        // ⚠️ Si falla algo en el proceso, se muestra en consola y se lanza el error
        console.error('Error en el proceso completo:', error);
        throw error;
    }
}
