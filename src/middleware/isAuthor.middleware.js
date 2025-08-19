import Vacancy from "../models/vacancies.model.js";

const isAuthor = async (req, res, next) => {
  try {
    // extraer la url de la vacante
    const {url} = req.params;
    // Extrater el id del usuario logueado
    const {_id} = req.user;
    // Buscar la vacante por su URL
    const vacancy = await Vacancy.findOne({url});
    if (!vacancy) {
      return res.status(404).render("error", {
        status: 404,
        message: req.flash('error', 'La vacante no existe'),
      });
    }

    // Verificar si el usuario autenticado es el autor
    if (vacancy.autor.toString() !== _id.toString()) {
      req.flash('error', 'No eres el creador de la vacante');
      return res.status(403).redirect('/');
    }

    // Guardamos la vacante en req para usarla en el controller
    req.vacancy = vacancy;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      status: 500,
      message: "Error al verificar permisos",
    });
  }
};

export default isAuthor;