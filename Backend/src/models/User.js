const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
        },
        apellido: {
            type: String,
            required: [true, ' El apellido es obligatorio'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatorio'],
            minlength: 8,
        },
        rol: {
            type: String,
            enum: ['coach','client'],
            required: [true, 'El rol es obligatorio'],
        },
        foto: {
            type: String,
            default: '',
        },
        activo: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)