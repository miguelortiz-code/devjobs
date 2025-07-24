// Validar si el usuario esta autenticado
const isAuthenticated = (req, res, next) =>{
    //Revisar usuario
    if(req.isAuthenticated()){
        return next(); // están autenticados
    }
    // Redireccionar
    res.redirect('/auth/login');
}

const noCache = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
};

export {
    isAuthenticated,
    noCache
}