const mongoose = require('mongoose')

const coachSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        expecialidad: {
            type: String,
            default: '',
            trim: true,
        },
        bio: {
            type: String,
            default: '',
            trim: true,
        },
        experiencia: {
            type: Number,
            default: 0,
        },
        certificaciones: {
            type: [String],
            default: [],
        },
        instagram: {
            type: String,
            default :'',
            trim: true,
        },
        whatsapp: {
            type: String,
            default: '',
            trim: true,
        },
        Calificacion: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        totalClientes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Coach', coachSchema)