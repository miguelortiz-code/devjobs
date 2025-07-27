import multer from "multer";

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Error de tamaño de archivo
    if (err.code === 'LIMIT_FILE_SIZE') {
      req.flash('error', 'La imagen es demasiado grande. Máximo 100 KB.');
    } else {
      req.flash('error', err.message || 'Error al subir el archivo.');
    }
    return res.redirect('/account/profile');
  }

  // Error personalizado (como tipo de archivo inválido)
  if (err) {
    req.flash('error', err.message || 'Error al subir el archivo.');
    return res.redirect('/account/profile');
  }

  // Si no hay errores, continuar
  next();
};

export default multerErrorHandler;