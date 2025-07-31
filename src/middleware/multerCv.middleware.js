import multer from 'multer';
import shortid from 'shortid';
import path from 'path';

// Configuración de almacenamiento para CV
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/public/uploads/cv');
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + path.extname(file.originalname).toLowerCase());
    }
});

// Solo permitir PDF
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'application/pdf'){
        cb(null, true);
    }else{
        cb(new Error('Solo se permiten archivos en formato PDF'), false);
    }
}

const uploadCv = multer({
    storage,
    fileFilter,
    limits: { fileSize : 2 * 1024 * 1024} // Maximo 2 MB
});


export default uploadCv