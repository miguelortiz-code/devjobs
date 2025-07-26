import mongoose from "mongoose";
import bcrypt from 'bcrypt'

mongoose.Promise = global.Promise;

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
        lowercase:true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: String,
    token : String,
    expire: Date
}, { timestamps: true });

// Método para hasear los passwords
usersSchema.pre('save', async function(next){
    // Si el password ya está hasheado
    if(!this.isModified('password')){
        return next();
    }

    // Si no está hasheado
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    next();
})
// Enviar alerta cuando un usuario ya está registrado
usersSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        return next(new Error('El correo ya se encuentra registrado'));
    }
    next(error);
});

// Autenticar usuarios
usersSchema.methods = {
    comparePassword : function(password){
        return bcrypt.compareSync(password, this.password);
    }
}

const Users = mongoose.model('users', usersSchema);

export default Users