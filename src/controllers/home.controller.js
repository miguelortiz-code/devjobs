const displayJobs = (req, res) =>{
    res.render('home', {
        namePage: 'devJobs',
        tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        navbar: true,
        button: true
    });
}

export{
    displayJobs
}