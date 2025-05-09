// Importa Express, el framework principal del servidor
import express from 'express';

// Importa la función que conecta a la base de datos MongoDB
import { connectDB } from './config/dbConfig.mjs';

// Importa el archivo de rutas de países (donde están definidas todas las rutas para vistas y API)
import paisRoutes from './routes/paisesRoutes.mjs';
import apiPaisesRoutes from './routes/apiPaisesRoutes.mjs';


// Importa utilidades de Node.js para manejar rutas absolutas (porque __dirname no existe en módulos ES)
import path from 'path';
import { fileURLToPath } from 'url';

// Permite usar métodos PUT y DELETE en formularios HTML usando un campo oculto `_method`
import methodOverride from 'method-override';

// Middleware que permite trabajar con un layout base en vistas EJS
import expressLayouts from 'express-ejs-layouts';

// Importa la función que ejecuta la lógica de traer países desde una API externa y guardarlos en MongoDB
import { obtenerYGuardarPaises } from './controllers/paisesController.mjs';

// Estas líneas permiten obtener el path actual (__dirname) en módulos ES
const __filename = fileURLToPath(import.meta.url);   // Obtiene la ruta completa del archivo actual
const __dirname = path.dirname(__filename);          // Extrae la carpeta base donde está el archivo

// Crea la aplicación Express
const app = express();

// Define el puerto en el que se ejecutará el servidor. Si hay una variable de entorno PORT la usa, si no usa 3000
const PORT = process.env.PORT || 3000;

// 🔌 Conexión a la base de datos
connectDB(); // Ejecuta la conexión a MongoDB mediante mongoose, definida en dbConfig.mjs

// ==========================
// 🧱 MIDDLEWARES GENERALES
// ==========================

// Permite recibir y parsear cuerpos JSON en las peticiones (especialmente útil para APIs)
app.use(express.json());

// Permite recibir datos de formularios HTML y convertirlos a objetos JavaScript (req.body)
app.use(express.urlencoded({ extended: true }));

// Permite usar PUT y DELETE en formularios HTML usando un campo oculto: <input name="_method" value="PUT" />
app.use(methodOverride('_method'));

// ==============================
// 📄 CONFIGURACIÓN DE EJS Y LAYOUTS
// ==============================

// Define que el motor de vistas será EJS (Embedded JavaScript Templates)
app.set('view engine', 'ejs');

// Define la carpeta donde están las vistas `.ejs`
app.set('views', path.join(__dirname, 'views'));

// Activa los layouts, permitiendo que todas las vistas usen una plantilla base
app.use(expressLayouts);

// Define cuál será el layout por defecto (layout.ejs dentro de views/)
app.set('layout', 'layout');

// ==============================
// 📂 ARCHIVOS ESTÁTICOS
// ==============================

// Permite servir archivos estáticos como CSS, imágenes o JS que estén en la carpeta `public`
app.use(express.static(path.join(__dirname, 'public')));

// ==============================
// 🌐 RUTA INICIAL
// ==============================

// Cuando el usuario entra a la raíz del sitio ("/"), se renderiza la vista home.ejs
app.get('/', (req, res) => {
  res.render('home'); // Muestra la página inicial
});

// =======================================
// 🔁 RUTA PARA IMPORTAR PAÍSES EXTERNOS
// =======================================

// Ejecuta el flujo que obtiene países desde la API de restcountries y los guarda en MongoDB
app.get('/importar-paises', obtenerYGuardarPaises);

// ==========================
// 🧭 RUTAS PRINCIPALES
// ==========================

// Monta las rutas de países en "/dashboard" para las vistas (HTML)
app.use('/dashboard', paisRoutes);

// También las monta en "/api/paises" para usarlas como API (Postman o fetch)
app.use('/api/paises', apiPaisesRoutes);

// ==========================
// 🛑 RUTA 404
// ==========================

// Si ninguna de las rutas definidas anteriormente coincide, devuelve un error 404
app.use((req, res) => {
  res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

// ==========================
// 🚀 INICIO DEL SERVIDOR
// ==========================

// Inicia el servidor y lo pone a escuchar en el puerto definido. Muestra en consola que está activo.
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
