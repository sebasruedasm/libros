import { checkSchema } from "express-validator";

export const postBookValidator = checkSchema({
    titulo: {
        notEmpty: {
            errorMessage: 'El título no puede estar vacío'
        },
        isLength: {
            options: { min: 5, max: 100 },
            errorMessage: {
                min: 'El título debe tener al menos 5 caracteres',
                max: 'El título debe tener máximo 100 caracteres'
            }
        }
    },
    autor: {
        notEmpty: {
            errorMessage: 'El título no puede estar vacío'
        },
        isLength: {
            options: { min: 4, max: 50 },
            errorMessage: {
                min: 'El autor debe tener al menos 4 caracteres',
                max: 'El autor debe tener máximo 50 caracteres'
            }
        }
    },
    anyo: {
        notEmpty: {
            errorMessage: 'El año no puede estar vacío'
        },
        isInt: {
            options: { min: 1500, max: new Date().getFullYear() }, // Establece un rango desde 1900 hasta el año actual
            errorMessage: `El año debe ser un número entero entre 1500 y ${new Date().getFullYear()}`
        },
        custom: {
            options: (value) => /^[0-9]{4}$/.test(value), // Valida que tenga exactamente 4 dígitos
            errorMessage: 'El año debe tener exactamente 4 dígitos y ser válido'
        }
    },
    ciudad: {
        notEmpty: {
            errorMessage: 'La ciudad no puede estar vacía'
        },
        isLength: {
            options: { min: 3, max: 20 },
            errorMessage: {
                min: 'La ciudad debe tener al menos 3 caracteres',
                max: 'La ciudad debe tener máximo 20 caracteres'
            }
        }
    },
    editorial: {
        notEmpty: {
            errorMessage: 'La editorial no puede estar vacía'
        },
        isLength: {
            options: { min: 3, max: 60 },
            errorMessage: {
                min: 'La editorial debe tener al menos 3 caracteres',
                max: 'La editorial debe tener máximo 60 caracteres'
            }
        }
    },
    images: {
        notEmpty: {
            errorMessage: 'Las imágenes no pueden estar vacías'
        }
    }
}, ['body']);
