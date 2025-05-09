// Importo Mongoose para poder definir el esquema del país y trabajar con MongoDB
import mongoose from 'mongoose';

// Defino el esquema del país, que es la estructura que van a tener los documentos en la base de datos
const paisSchema = new mongoose.Schema({
  // Objeto 'name' con el nombre común, oficial y el nativo (que puede variar de formato)
  name: {
    common: String,                       // Nombre común (ej: Argentina)
    official: String,                     // Nombre oficial (ej: República Argentina)
    nativeName: mongoose.Schema.Types.Mixed // Puede tener muchos idiomas, por eso Mixed
  },

  independent: Boolean,                   // Si es un país independiente
  status: String,                         // Estado del país (ej: officially-assigned)
  unMember: Boolean,                      // Si es miembro de la ONU
  currencies: mongoose.Schema.Types.Mixed, // Monedas, puede venir como objeto
  capital: [String],                      // Capitales (algunos países tienen más de una)
  region: String,                         // Región general (ej: Americas)
  subregion: String,                      // Subregión (ej: South America)
  languages: mongoose.Schema.Types.Mixed, // Idiomas (vienen en formato de objeto con códigos)
  latlng: [Number],                       // Coordenadas geográficas
  landlocked: Boolean,                    // Si no tiene salida al mar
  borders: [String],                      // Fronteras con otros países (códigos de 3 letras)
  area: Number,                           // Área total en km²
  flag: String,                           // Emoji o ícono de bandera
  maps: mongoose.Schema.Types.Mixed,      // Links a mapas (Google Maps, OpenStreetMap)
  population: Number,                     // Población total
  fifa: String,                           // Código FIFA (ej: ARG)
  timezones: [String],                    // Zonas horarias (puede tener varias)
  continents: [String],                   // Continentes (algunos países están en más de uno)
  flags: mongoose.Schema.Types.Mixed,     // Objetos con imágenes de banderas
  startOfWeek: String,                    // Día en que comienza la semana (lunes, domingo, etc.)
  capitalInfo: mongoose.Schema.Types.Mixed, // Información geográfica extra de la capital

  creador: String                         // Campo que uso para saber quién creó el país (yo = Isaias)
});

// Creo el modelo 'Pais' basado en el esquema y lo conecto a la colección 'Grupo-01'
// Es importante pasar el nombre exacto de la colección para evitar problemas
const Pais = mongoose.model('Pais', paisSchema, 'Grupo-01');

// Exporto el modelo para poder usarlo en controladores, servicios, etc.
export default Pais;



