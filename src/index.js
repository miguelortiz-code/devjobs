import MongoStore from 'connect-mongo';
import './config/database.js';
import express from 'express';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {engine} from 'express-handlebars';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';
import handlebars from 'handlebars';
import createHttpError from 'http-errors';
import {homeRoutes, authRoutes, dashboardRoutes, profileRoutes} from './routes/index.routes.js'
import { selectSkills, showAlerts } from './helpers/handlebars.helper.js';
import { message } from './middleware/message.middleware.js';
import passport from './config/passport.js';
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
      selectSkills,
      showAlerts
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

// Iniciarlizar Passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash message
app.use(flash());
app.use (message);

// Routing
app.use('/', homeRoutes); // Página principal
app.use('/auth', authRoutes) // Autenticación
app.use('/', dashboardRoutes) // Panel administrativo
app.use('/account', profileRoutes) // Perfil del usuario
// 404 Página no existe
app.use((req, res, next) =>{
  next(createHttpError(404, 'Página no encontrada'))
});

// Administración de los errores
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    status: err.status || 500,
    message: err.message || 'Ocurrió un error en el servidor'
  });
});


// Arrancando servidor
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el ${process.env.BACKEND_URL}${process.env.PORT}`);
})