const viewAdmin = (req, res) =>{
    res.render('admin/dashboard',{
        namePage: 'Panel administativo',
        tagline: 'Crea y administra tus vacantes desde aquí'
    })
}

export{
    viewAdmin
}