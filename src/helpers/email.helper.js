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