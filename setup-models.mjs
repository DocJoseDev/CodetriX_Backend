#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Función para crear directorio de forma segura
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Carpeta creada: ${dir}`);
  } else {
    console.log(`✓ Carpeta ya existe: ${dir}`);
  }
}

// Función para crear archivo
function createFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`✓ Archivo ya existe: ${filePath}`);
  } else {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Archivo creado: ${filePath}`);
  }
}

// Obtener la ruta base del proyecto
const projectRoot = process.cwd();
const modelsDir = path.join(projectRoot, 'src', 'models');

// Crear la carpeta models
ensureDir(modelsDir);

// Contenido del modelo Registro
const modelContent = `import mongoose from 'mongoose';

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

// Crear el archivo del modelo
const modelPath = path.join(modelsDir, 'registro.model.js');
createFile(modelPath, modelContent);

console.log('\n✅ Configuración completada exitosamente!');
console.log('\nEstructura creada:');
console.log('  src/');
console.log('  └── models/');
console.log('      └── registro.model.js');
console.log('\nYa puedes usar el modelo Registro en tus controladores.');
