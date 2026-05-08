const mongoose = require('mongoose')

const ejercicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  series: { type: Number, default: 3 },
  repeticiones: { type: Number, default: 10 },
  descansoSegundos: { type: Number, default: 60 },
  notas: { type: String, default: '' },
})

const diaSchema = new mongoose.Schema({
  dia: {
    type: String,
    enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
    required: true,
  },
  grupoMuscular: {
    type: String,
    default: 'descanso',
  },
  esDescanso: {
    type: Boolean,
    default: false,
  },
  ejercicios: [ejercicioSchema],
})

const routineSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coach',
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
      required: true,
    },
    semana: {
      type: Number,
      required: true,
      default: 1,
    },
    dias: [diaSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Routine', routineSchema)