const displayJobs = (req, res) =>{
    res.render('home', {
        namePage: 'devJobs',
        tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        navbar: true,
        button: true
    });
}
// Vista para mostrar el formulario de una nueva vacante
const formVacancie = (req, res) =>{
    res.render('new-vacancy', {
        namePage: 'Crear Vacante',
        tagline:  'Llena el formulario y publica la vacante'
    });
};

export{
    displayJobs,
    formVacancie
}