import mongoose from "mongoose";
import slug from "slug";
import shortid from "shortid";

mongoose.Promise = global.Promise;

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'El nombre de la vacante es obligatorio',
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  ubication: {
    type: String,
    trim: true,
    required: 'La ubicación es obligatoria',
  },
  salary: {
    type: String,
    trim: true,
    default: "0",
  },
  contract: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    lowercase: true,
  },
  skills: [String],
  candidates: [
    {
      nombre: String,
      email: String,
      cv: String,
    },
  ],
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: 'El autor es obligatorio'
  }
}, { timestamps: true });

// Generar slug antes de guardar
vacancySchema.pre('save', function(next) {
  const url = slug(this.title);
  this.url = `${url}-${shortid.generate()}`;
  next();
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

export default Vacancy;