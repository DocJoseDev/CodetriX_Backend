// Importar el modelo Registro para acceder a la base de datos
import Registro from '../models/registro.model.js';

// Endpoint GET existente para pruebas
const getCodigoV1 = (req, res) => {
  res.status(200).json({
    endpoint: 'codigov1',
    message: 'Endpoint codigov1 funcionando correctamente',
    timestamp: new Date().toISOString()
  });
};

// Nuevo endpoint POST para crear un registro
// Recibe codigo_alumno en el body de la solicitud
const createRegistro = async (req, res) => {
  try {
    // Extraer codigo_alumno del cuerpo de la solicitud
    const { codigo_alumno } = req.body;

    // Validar que codigo_alumno esté presente
    if (!codigo_alumno) {
      return res.status(400).json({
        error: 'El código del alumno es obligatorio',
        timestamp: new Date().toISOString()
      });
    }

    // Crear una nueva instancia del modelo Registro
    // Los campos valido y timestamp se asignan automáticamente con sus valores por defecto
    const nuevoRegistro = new Registro({
      codigo_alumno,
      // valido: true (valor por defecto)
      // timestamp: Date.now (valor por defecto)
    });

    // Guardar el registro en la base de datos
    const registroGuardado = await nuevoRegistro.save();

    // Retornar el registro guardado con status 201 (Created)
    res.status(201).json({
      message: 'Registro creado exitosamente',
      registro: registroGuardado,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Manejar errores de validación o de base de datos
    console.error('Error al crear registro:', error.message);
    
    res.status(500).json({
      error: 'Error al crear el registro',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

export { getCodigoV1, createRegistro };
