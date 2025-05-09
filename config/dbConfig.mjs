// Importa Mongoose, que es la librería que usamos para conectarnos a MongoDB
import mongoose from 'mongoose';

// Función asincrónica que realiza la conexión a la base de datos
export async function connectDB() {
    try {
        // Conecta a MongoDB usando la URI del cluster de Atlas
        await mongoose.connect('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js', {
            useNewUrlParser: true,        // Usa el nuevo parser de URLs (mejor compatibilidad)
            useUnifiedTopology: true      // Usa el nuevo motor de conexión de Mongo
        });

        // Si la conexión es exitosa, muestra este mensaje en consola
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        // Si ocurre un error en la conexión, lo muestra en consola
        console.error('Error al conectar a MongoDB;', error);

        // Finaliza la aplicación con un código de error (1)
        process.exit(1);
    }
}
