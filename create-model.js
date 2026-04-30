// Para ejecutar: node create-model.js

import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modelsPath = path.join(__dirname, 'src', 'models');
const modelFilePath = path.join(modelsPath, 'registro.model.js');

try {
  // Crear directorio si no existe
  if (!fs.existsSync(modelsPath)) {
    fs.mkdirSync(modelsPath, { recursive: true });
    console.log(`✓ Directorio creado: ${modelsPath}`);
  }

  // Contenido del modelo
  const modelCode = `import mongoose from 'mongoose';

// Definir el esquema del modelo Registro
// Este esquema define la estructura de los documentos en la colección "registros"
const registroSchema = new mongoose.Schema({
  // codigo_alumno: identificador único del alumno (String, requerido)
  codigo_alumno: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco al inicio y final
  },

  // valido: estado del registro (Boolean, por defecto true)
  valido: {
    type: Boolean,
    default: true
  },

  // timestamp: fecha y hora de creación del registro (Date, por defecto ahora)
  // MongoDB maneja automáticamente el campo _id, no es necesario definirlo
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Crear el modelo "Registro" basado en el esquema definido
// El modelo se mapea a la colección "registros" en MongoDB
const Registro = mongoose.model('Registro', registroSchema);

export default Registro;
`;

  // Escribir archivo
  fs.writeFileSync(modelFilePath, modelCode, 'utf8');
  console.log(`✓ Modelo creado: ${modelFilePath}`);
  console.log('\n✅ ¡Listo! El modelo Registro está configurado correctamente.');
  console.log('\nAhora puedes usar: npm run dev');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
