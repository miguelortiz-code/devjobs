import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path'
import {fileURLToPath} from 'url'
import {authRoutes} from './routes/index.routes.js'
const app = express();

// Habilitar Handlebars como view
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

// Archivos estaticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', authRoutes);
// Arrancando servidor
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el ${process.env.BACKEND_URL}${process.env.PORT}`);
})