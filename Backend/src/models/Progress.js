const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    peso: {
      type: Number,
      default: null,
    },
    notas: {
      type: String,
      default: '',
    },
    foto: {
      type: String,
      default: '',
    },
    semana: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Progress', progressSchema)