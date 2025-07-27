import multer from "multer";
import path from 'path';
import shortid from "shortid";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './src/public/uploads/profiles');
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) =>{
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if(allowedTypes.includes(file.mimetype)){
        // El callback se ejecuta como true o false: true cuando acepta el formato establecido
        cb(null, true);
    }else{
        cb(new Error('El formato del archivo no es válido (solo .jpg, .png, .webp).'), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 100000}
});

export default upload;