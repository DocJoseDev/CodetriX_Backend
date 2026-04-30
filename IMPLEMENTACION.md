# Instrucciones para completar la implementación

## ✅ Estado actual

Los siguientes archivos YA ESTÁN ACTUALIZADOS:

1. ✅ **src/controllers/codigo.controller.js** - Ya contiene:
   - Import del modelo Registro
   - Endpoint GET `getCodigoV1` (conservado)
   - Nuevo endpoint POST `createRegistro` con:
     - Recepción de codigo_alumno del body
     - Validación del campo requerido
     - Creación de registro en BD con valores por defecto
     - Manejo de errores con try/catch

2. ✅ **src/routes/codigo.routes.js** - Ya contiene:
   - Importación de ambos controladores
   - Rutas GET existentes (conservadas)
   - Nueva ruta POST `/registros` que llama a createRegistro

## ⚠️ Pendiente

### Crear el modelo Registro

**Ruta del archivo:** `src/models/registro.model.js`

**Contenido:**
```javascript
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
```

## Cómo crear el archivo

Opción 1: Ejecutar el script setup-models.mjs
```bash
cd c:\Users\karol\Documents\codetrix_back_fork\CodetriX_Backend
node setup-models.mjs
```

Opción 2: Ejecutar el script bash (si tienes git bash o similar)
```bash
bash init-models.sh
```

Opción 3: Crear manualmente
- Crea la carpeta: `src\models`
- Crea el archivo: `src\models\registro.model.js`
- Copia el contenido del código javascript anterior

## 📋 Resumen de cambios

### Archivos CREADOS:
- `src/models/registro.model.js` - Modelo de Mongoose para Registros

### Archivos MODIFICADOS:
- `src/controllers/codigo.controller.js` - Agregado endpoint POST
- `src/routes/codigo.routes.js` - Agregada ruta POST /registros

### Archivos SIN CAMBIOS:
- `src/config/db.js` - Conexión a MongoDB (sin cambios necesarios)
- `src/app.js` - Configuración de Express
- `src/server.js` - Entrada de la aplicación

## 🧪 Prueba del endpoint

Una vez creado el modelo, puedes probar el endpoint POST:

```bash
# Iniciar servidor
npm run dev

# En otra terminal, hacer un POST request
curl -X POST http://localhost:3000/registros \
  -H "Content-Type: application/json" \
  -d '{"codigo_alumno":"A12345"}'

# Respuesta esperada (201 Created):
{
  "message": "Registro creado exitosamente",
  "registro": {
    "_id": "...",
    "codigo_alumno": "A12345",
    "valido": true,
    "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
  },
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

## ✨ Características implementadas

✅ Modelo Mongoose con schema bien definido
✅ Campo codigo_alumno requerido y trimmed
✅ Campo valido con valor por defecto true
✅ Campo timestamp con valor por defecto Date.now
✅ MongoDB gestiona el _id automáticamente
✅ Endpoint POST para crear registros
✅ Validación de campos requeridos
✅ Manejo completo de errores
✅ Código comentado y modular
✅ Endpoints GET existentes conservados
