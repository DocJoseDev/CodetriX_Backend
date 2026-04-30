#!/bin/bash
# Script para crear la estructura de modelos

# Crear carpeta de modelos
mkdir -p src/models

# Crear el archivo del modelo Registro
cat > src/models/registro.model.js << 'EOF'
import mongoose from 'mongoose';

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
EOF

echo "Carpeta y archivo del modelo creados exitosamente"
