const mongoose = require('mongoose')

const planSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coach',
      required: true,
    },
    nombre: {
      type: String,
      required: [true, 'El nombre del plan es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      default: '',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: 0,
    },
    duracionMeses: {
      type: Number,
      required: true,
      default: 1,
    },
    diasPorSemana: {
      type: Number,
      default: 3,
      min: 1,
      max: 7,
    },
    caracteristicas: {
      type: [String],
      default: [],
    },
    activo: {
      type: Boolean,
      default: true,
    },
    totalInscritos: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Plan', planSchema)