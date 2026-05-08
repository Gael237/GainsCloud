const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    edad: {
      type: Number,
      default: null,
    },
    sexo: {
      type: String,
      enum: ['masculino', 'femenino', 'otro'],
      default: 'masculino',
    },
    peso: {
      type: Number,
      default: null,
    },
    altura: {
      type: Number,
      default: null,
    },
    objetivo: {
      type: String,
      enum: [
        'ganar_musculo',
        'perder_peso',
        'mantener_fisico',
        'mejorar_resistencia',
      ],
      default: 'mantener_fisico',
    },
    puntosAMejorar: {
      type: String,
      default: '',
    },
    notasCoach: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

// IMC virtual calculado
clientSchema.virtual('imc').get(function () {
  if (this.peso && this.altura) {
    return (this.peso / (this.altura * this.altura)).toFixed(1)
  }
  return null
})

clientSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Client', clientSchema)