const mongoose = require ('mongoose')

 const subscriptionSchema = new mongoose.Schema(
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
        plan: {
            type: mongoose.Schema.ObjectId,
            ref: 'Plan',
            required: true,
        },
        estado: {
            type: String,
            enum: ['active', 'paused', 'cancelled'],
            default: 'active',
        },
        fechaInicio: {
            type: Date,
            default: Date.now,
        },
        fechaFin: {
            type: Date,
            default: null,
        },
        semanaActual: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
 )

 module.exports = mongoose.model('Subscription', subscriptionSchema)