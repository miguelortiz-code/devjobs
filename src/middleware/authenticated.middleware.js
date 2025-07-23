// Validar si el usuario esta autenticado
const isAuthenticated = (req, res, next) =>{
    //Revisar usuario
    if(req.isAuthenticated()){
        return next(); // están autenticados
    }
    // Redireccionar
    res.redirect('/auth/login');
}

export {
    isAuthenticated
}