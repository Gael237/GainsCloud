const mogoose = require('mongoose')


const connectDB = async () => {
    try {
        const conn = await mogoose.connect(ProcessingInstruction.env.MONGO_URI)
        console.log(`MongoDB conectado: ${conn.conection.host}`)
    } catch (error) {
        console.error(`Error al conectar MongoDB: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB