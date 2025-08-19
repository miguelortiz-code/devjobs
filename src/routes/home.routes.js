import express from "express";
import {
  displayJobs,
  formVacancie,
  addVacancy,
  showVacancy,
  formEditVacancy,
  editVacancy,
  deleteVacancy,
  uploadResume,
  search,
} from "../controllers/home.controller.js";
import {
  isAuthenticated,
  isAuthor,
  noCache,
  multerErrorHandler,
  uploadCv,
} from "../middleware/index.middleware.js";
const router = express.Router();

// Rutas Get
router.get("/", displayJobs);
router.get("/vacancies/new", isAuthenticated, noCache, formVacancie); // formulario para crear Vacantes
router.get("/vacancy/:url", showVacancy); // Mostrar Vacante
router.get("/vacancy/edit/:url", isAuthenticated, isAuthor, noCache, formEditVacancy); // Editar Vacante
router.delete(
  "/vacancy/delete/:id",
  isAuthenticated,
  isAuthor,
  noCache,
  deleteVacancy
); // Eliminar Vacante
// Rutas POST
router.post("/vacancies/new", isAuthenticated, noCache, addVacancy); // Agregar nueva vacante
router.post("/vacancies/edit/:url", isAuthenticated, noCache, editVacancy); // Editar vacante
router.post(
  "/vacancy/:url",
  noCache,
  uploadCv.single("cv"),
  multerErrorHandler,
  uploadResume
); // agregar candidato con PDF
router.post("/search", noCache, search);

export default router;
