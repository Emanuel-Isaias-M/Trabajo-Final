# Trabajo-Final# 🌍 Países App

Aplicación full stack hecha con Node.js, Express y MongoDB. Permite importar países desde una API externa, almacenarlos en MongoDB y realizar operaciones CRUD tanto desde una interfaz visual (vistas EJS) como desde una API en formato JSON.

---

## 🛠 Tecnologías

- **Node.js** con **Express**
- **MongoDB** con **Mongoose**
- **EJS** como motor de vistas
- **express-validator** para validaciones
- **method-override** para usar PUT/DELETE desde formularios HTML
- **REST Countries API** para importar países

---

## ✨ Funcionalidades

### ✅ Vistas (HTML - EJS)

- Ver lista de países (`/dashboard`)
- Agregar un país (`/dashboard/agregar`)
- Editar país (`/dashboard/editar/:id`)
- Eliminar país (botón en tabla)

### ✅ API (JSON - REST)

- `GET /api/paises` → lista de países
- `POST /api/paises` → crear país
- `PUT /api/paises/:id` → editar país
- `DELETE /api/paises/:id` → eliminar país

### ✅ Extra

- `GET /importar-paises` → importa todos los países desde (https://restcountries.com/v3.1/all).
- Validaciones de campos (nombre, capital, área, población, etc.)

---

## 🧾 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/paises-app.git



Instalar dependencias:
npm install

Iniciar servidor:
node app.mjs


El servidor corre en:
👉 http://localhost:3000


📦 paises-app
├── config/
│   └── dbConfig.mjs              # Conexión a MongoDB con Mongoose
│
├── controllers/
│   └── paisesController.mjs      # Controladores de rutas: recibe req/res y llama a servicios
│
├── models/
│   └── paisModel.mjs             # Esquema de Mongoose que define cómo se guarda un país
│
├── public/
│   └── css/                      # Archivos estáticos como estilos
│
├── repositories/
│   ├── IPaisRepository.mjs       # Interfaz abstracta (define qué métodos debe tener el repositorio)
│   └── PaisRepository.mjs        # Clase concreta que implementa los métodos para acceder a MongoDB
│
├── routes/
│   ├── paisesRoutes.mjs          # Rutas para vistas (usa controladores y renderiza EJS)
│   └── apiPaisesRoutes.mjs       # Rutas para API REST (responde en JSON)
│
├── services/
│   ├── paisAPIService.mjs        # Servicio que obtiene países desde una API externa
│   └── paisService.mjs           # Lógica intermedia entre el controlador y el repositorio
│
├── validation/
│   ├── paisValidation.mjs        # Validaciones con express-validator (name, capital, etc.)
│   └── manejarErroresApi.mjs     # Middleware para capturar y devolver errores de validación
│
├── views/
│   ├── layout.ejs                # Plantilla base
│   ├── dashboard.ejs             # Vista principal con listado de países
│   ├── add.ejs                   # Formulario para agregar país
│   └── edit.ejs                  # Formulario para editar país
│
├── app.mjs                       # Archivo principal de Express: monta middlewares y rutas
├── package.json                  # Dependencias del proyecto y scripts
├── package-lock.json             # Versión exacta de cada paquete
└── README.md                     # Información general del proyecto




🙋‍♂️ Autor
Proyecto realizado por Isaias Morales como parte de su formación en desarrollo full stack y backend con Node.js y MongoDB.
