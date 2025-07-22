import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../models/users.model.js';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) =>{
        // Consultar al usuario desde la base de datos
        const user = await Users.findOne({email});
        // si no existe el usuario
        if(!user) return done(null, false, {
            message: 'El usuario no existe'
        });

        // Verificar la constraseña
        const verifyPassword = user.comparePassword(password);
        if(!verifyPassword) return done(null, false, {
            message: 'Credenciales incorrectas'
        });

        // El usuario existe y el password es correcto
        return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async(id, done) => {
    const user = await Users.findById(id).exec();
    return done(null, user);
});

export default passport