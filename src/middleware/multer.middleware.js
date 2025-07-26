import multer from "multer";
import path from 'path';
import shortid from "shortid";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './src/public/uploads/profiles');
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

export default upload;