import express from 'express';
const app = express();

app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el ${process.env.BACKEND_URL}${process.env.PORT}`);
})