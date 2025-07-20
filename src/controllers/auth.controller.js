// Vista para mostrar el formulario de registro
const formRegister = (req, res) =>{
    res.render('auth/register', {
        namePage: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}

export{
    formRegister
}