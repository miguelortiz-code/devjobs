import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import './config/database.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {engine} from 'express-handlebars';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';
import handlebars from 'handlebars';
import {authRoutes} from './routes/index.routes.js'
import { selectSkills } from './helpers/handlebars.helper.js';
const app = express();


// Habilitar lectura de datos en formularios
app.use(express.urlencoded({extended: true}));

// Habilitar Handlebars como view
// Habilitar Handlebars como view
app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: {
      selectSkills
    }
  })
);

app.set('view engine', 'handlebars');
app.set('views', 'src/views');

// Archivos estaticos
app.use(express.static('src/public'));

// Habilitando cookie
app.use(cookieParser());

// Habilitando Session
app.use(session({
    secret: process.env.SECRET,
    key : process.env.KEY,
    resave: false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: process.env.DB,
        ttl: 60 * 60 // tiempo de expiración en segundos (opcional)
     })
}));

// Routing
app.use('/', authRoutes);
// Arrancando servidor
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el ${process.env.BACKEND_URL}${process.env.PORT}`);
})