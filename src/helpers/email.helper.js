import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';


const resetPassword = async (data) =>{
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Configuración de handlebars para nodemailer
    transport.use('compile', hbs({
        viewEngine: {
            extname: '.handlebars',
            layoutsDir: path.resolve('./src/views/emails'), // Carpeta donde están tus plantillas
            defaultLayout: false
        },
        viewPath: path.resolve('./src/views/emails'), // Carpeta donde están tus plantillas
        extName: '.handlebars'
    }));

    // Extraer la información del controlador
    const {name, email, resetUrl, archive} = data;
    
    // Enviar Email
    try {
        await transport.sendMail({
            from: '"devJobs" <no-reply@devJobs.com>',
            to: email,
            subject: "Restablece tu contraseña en devJobs",
            template: archive,
            context: {
                name,
                resetUrl
            }

        })
    } catch (error) {
        console.log(`Error al enviar el correo electrónico: ${error}`);
    }
}

export {
    resetPassword
}