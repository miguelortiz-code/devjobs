import mongoose from "mongoose";
import {Vacancy, Users} from '../models/index.model.js';

// Conexión a la base de datos
mongoose.connect(process.env.DB);

// Evento si la conexión falla
mongoose.connection.on('error',(error) =>{
    console.log(`❌ Error de conexión a ${process.env.DB}: ${error}`);
})

// Conexion exitosa
mongoose.connection.once('open', () =>{
    console.log(`✅ Conexión exitosa a la base de datos ${process.env.DB}`);
});

// Evento cuando se desconecta
mongoose.connection.on('disconnected', () =>{
    console.warn(`⚠️ Conexión a ${process.env.DB}  cerrada`);
});