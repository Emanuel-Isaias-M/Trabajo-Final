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

- `GET /importar-paises` → importa todos los países desde [restcountries.com](https://restcountries.com)
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
│   └── dbConfig.mjs          # Conexión a MongoDB
├── controllers/
│   └── paisesController.mjs  # Lógica principal
├── models/
│   └── paisModel.mjs         # Esquema Mongoose
├── public/
│   └── css/                  # Estilos
├── routes/
│   ├── paisesRoutes.mjs      # Rutas para vistas
│   └── apiPaisesRoutes.mjs   # Rutas para API JSON
├── services/
│   └── paisAPIService.mjs    # Fetch de países externos
├── validation/
│   ├── paisValidation.mjs
│   └── manejarErroresApi.mjs
├── views/
│   ├── layout.ejs
│   ├── dashboard.ejs
│   ├── add.ejs
│   └── edit.ejs
└── app.mjs                   # Punto de entrada



🙋‍♂️ Autor
Proyecto realizado por Isaias Morales como parte de su formación en desarrollo full stack y backend con Node.js y MongoDB.
