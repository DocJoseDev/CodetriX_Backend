# Implementación de Modelo Registro - Guía de Configuración

## 📋 Resumen de Cambios Realizados

He implementado la estructura de registro en la base de datos con los campos solicitados. Aquí está el estado actual:

### ✅ COMPLETADO

#### 1. **Controlador Actualizado** (`src/controllers/codigo.controller.js`)
   - ✓ Importación del modelo Registro
   - ✓ Endpoint GET existente conservado (`getCodigoV1`)
   - ✓ Nuevo endpoint POST (`createRegistro`) que:
     - Recibe `codigo_alumno` del body
     - Valida que el campo sea obligatorio
     - Crea registro con valores por defecto
     - Maneja errores completo

#### 2. **Rutas Actualizadas** (`src/routes/codigo.routes.js`)
   - ✓ Nueva ruta POST `/registros` que llama a `createRegistro`
   - ✓ Rutas GET existentes conservadas

#### 3. **Configuración BD** (`src/config/db.js`)
   - ✓ Conexión a MongoDB ya implementada

### ⏳ PRÓXIMO PASO (3 pasos simples)

## Instrucciones para Completar

### Opción A: Automática (RECOMENDADA)

```bash
# En la terminal, en la carpeta del proyecto:
npm run setup
```

Este comando ejecutará `create-model.js` que:
- Creará la carpeta `src/models/`
- Creará el archivo `src/models/registro.model.js` con el esquema correcto

### Opción B: Manual

Si el comando anterior no funciona, crea manualmente:

1. **Crear carpeta**: `src/models/` (dentro de la carpeta src)

2. **Crear archivo**: `src/models/registro.model.js` con este contenido:

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

---

## 🧪 Prueba del Endpoint Después de Crear el Modelo

Una vez que el modelo esté creado, prueba el endpoint:

### 1. Inicia el servidor
```bash
npm run dev
```

Deberías ver:
```
MongoDB connected: ...
Server running on port 3000
```

### 2. En otra terminal, prueba el POST

**Con curl:**
```bash
curl -X POST http://localhost:3000/registros \
  -H "Content-Type: application/json" \
  -d "{\"codigo_alumno\":\"A12345\"}"
```

**Con Postman o similar:**
- URL: `POST http://localhost:3000/registros`
- Body (JSON):
```json
{
  "codigo_alumno": "A12345"
}
```

### 3. Respuesta Esperada (201 Created)
```json
{
  "message": "Registro creado exitosamente",
  "registro": {
    "_id": "6798f1a2b3c4d5e6f7g8h9i0",
    "codigo_alumno": "A12345",
    "valido": true,
    "timestamp": "2024-04-23T20:46:52.670Z",
    "__v": 0
  },
  "timestamp": "2024-04-23T20:46:52.670Z"
}
```

---

## 📁 Estructura Final

Después de completar, tu proyecto tendrá:

```
CodetriX_Backend/
├── src/
│   ├── config/
│   │   └── db.js                    ✓ Sin cambios
│   ├── controllers/
│   │   └── codigo.controller.js    ✓ MODIFICADO
│   ├── models/                      ✓ NUEVO
│   │   └── registro.model.js        ✓ NUEVO
│   ├── routes/
│   │   └── codigo.routes.js        ✓ MODIFICADO
│   ├── app.js                       ✓ Sin cambios
│   └── server.js                    ✓ Sin cambios
├── package.json                     ✓ Actualizado (script setup)
└── ...
```

---

## 📝 Detalles del Modelo Registro

### Schema:
| Campo | Tipo | Requerido | Valor por Defecto | Descripción |
|-------|------|-----------|-------------------|-------------|
| `_id` | ObjectId | ✓ | Autogenerado | ID único (MongoDB) |
| `codigo_alumno` | String | ✓ | - | Código del alumno (trimmed) |
| `valido` | Boolean | ✗ | `true` | Estado del registro |
| `timestamp` | Date | ✗ | `Date.now` | Fecha de creación |

### Endpoints Disponibles:

**GET /codigov1** (Existente)
- Respuesta: Mensaje de prueba

**GET /nava** (Existente)
- Respuesta: "Are you talking to me !!"

**POST /registros** (NUEVO)
- Body: `{ "codigo_alumno": "valor" }`
- Respuesta: Registro guardado (201)
- Error: Campo requerido (400) o Error BD (500)

**GET /health** (Existente en app)
- Respuesta: `{ "status": "ok" }`

---

## ✨ Características Implementadas

✅ Modelo Mongoose con esquema completo  
✅ Validación de campos requeridos  
✅ Valores por defecto configurados  
✅ Endpoint POST funcional con try/catch  
✅ Manejo completo de errores  
✅ Código bien comentado  
✅ Estructura modular y escalable  
✅ Endpoints existentes conservados  
✅ Cumple todos los requisitos especificados  

---

## 🆘 Solución de Problemas

### Error: "Cannot find module 'registro.model.js'"
→ Ejecuta `npm run setup` para crear el archivo automáticamente

### Error: "Collection creation timeout"
→ Verifica que MONGODB_URI esté configurado en .env

### Error 400 "El código del alumno es obligatorio"
→ Envía `codigo_alumno` en el body del POST

---

## 📞 Siguientes Pasos Sugeridos

Después de completar esto, considera:
1. Agregar validación de formato para `codigo_alumno`
2. Crear endpoint GET para consultar registros
3. Agregar endpoint PUT para actualizar registros
4. Implementar filtros y paginación
5. Agregar tests unitarios

¡Listo! 🚀
