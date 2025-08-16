# 💼 DevJobs

La aplicación permite a los usuarios **publicar vacantes de empleo**, visualizar información detallada de cada oferta, y postularse enviando su **CV al reclutador**. También incluye un panel administrativo para gestionar vacantes, candidatos y el perfil del usuario de forma eficiente.  

---

## 📑 Índice

1. [🚀 Tecnologías utilizadas](#-tecnologías-utilizadas)  
2. [⚙️ Funcionalidades principales](#️-funcionalidades-principales)  
3. [🧪 Usuarios de prueba](#-usuarios-de-prueba)  
4. [📦 Instalación local](#-instalación-local)  
5. [🖼️ Capturas de pantalla](#️-capturas-de-pantalla)  
6. [🔌 Endpoints principales](#-endpoints-principales)  
   - [🔐 Autenticación](#-autenticación-auth)  
   - [💼 Vacantes](#-vacantes-vacancies)  
   - [👤 Usuarios](#-usuarios-users)  
   - [🔎 Búsqueda](#-búsqueda-search)  
7. [👤 Autor](#-autor)  

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Handlebars** (motor de plantillas)
- **Passport.js** (autenticación local)
- **Bcrypt** (hash de contraseñas)
- **Multer** (subida de archivos e imágenes)
- **Nodemailer** + **Express-Handlebars** (envío de correos)
- **http-errors** (gestión de errores HTTP)
- **dotenv** (variables de entorno)

---

## ⚙️ Funcionalidades principales

- Registro y autenticación de usuarios (con validaciones y alertas)  
- Creación, edición y eliminación de vacantes  
- Asociación de vacantes a reclutadores (relación User → Vacancy)  
- Subida de imágenes de perfil y CV con validación de formato y tamaño  
- Vista pública de vacantes y detalles individuales  
- Postulación a vacantes con registro de candidatos  
- Panel administrativo con gestión de vacantes y candidatos  
- Recuperación de contraseñas mediante token enviado por correo  
- Buscador de vacantes con índice en MongoDB  
- Middleware de seguridad para rutas protegidas  
- Manejo de errores personalizados con vistas dinámicas  

---

## 🧪 Usuarios de prueba

Puedes iniciar sesión con estos usuarios predefinidos:  

- 📧 **reclutador@gmail.com**  
  🔑 **DevJobs123**  

- 📧 **candidato@gmail.com**  
  🔑 **DevJobs123**  

> *Credenciales solo para fines de prueba*  

---

## 📦 Instalación local

1. Clona el repositorio:  

   ```bash
   git clone https://github.com/tu-usuario/devjobs.git
   cd devjobs
Instala dependencias:

bash
Copiar
Editar
npm install
Crea un archivo .env con tus configuraciones:

env
Copiar
Editar
DB_URI=mongodb://localhost:27017/devjobs
SESSION_SECRET=un_secreto_seguro
EMAIL_HOST=smtp.tucorreo.com
EMAIL_PORT=587
EMAIL_USER=correo@tucorreo.com
EMAIL_PASS=contraseña
Inicia el servidor en desarrollo:

bash
Copiar
Editar
npm run dev
Accede a la app en:
👉 http://localhost:3000

🖼️ Capturas de pantalla
Página principal

Detalle de vacante

Panel de administración


Perfil de usuario

🔌 Endpoints principales
🔐 Autenticación (/auth)
Método	Ruta	Descripción
GET	/auth/login	Formulario de inicio de sesión
POST	/auth/login	Procesa inicio de sesión
GET	/auth/register	Formulario de registro
POST	/auth/register	Procesa registro de usuario
GET	/auth/logout	Cierra sesión y limpia caché
GET	/auth/reset-password	Formulario para restablecer contraseña
POST	/auth/reset-password	Envía correo con token de recuperación
GET	/auth/reset/:token	Verifica token de recuperación
POST	/auth/reset/:token	Almacena nueva contraseña

💼 Vacantes (/vacancies)
Método	Ruta	Descripción
GET	/vacancies	Lista todas las vacantes
POST	/vacancies	Crear nueva vacante
GET	/vacancies/:id	Ver detalle de vacante
PUT	/vacancies/:id	Editar vacante
DELETE	/vacancies/:id	Eliminar vacante
POST	/vacancies/:id/apply	Postular candidato a una vacante
GET	/vacancies/:id/candidates	Ver candidatos de una vacante (reclutador)

👤 Usuarios (/users)
Método	Ruta	Descripción
GET	/users/profile	Ver perfil del usuario
PUT	/users/profile	Editar perfil con validaciones
POST	/users/upload	Subir imagen o CV del usuario

🔎 Búsqueda (/search)
Método	Ruta	Descripción
GET	/search?q=texto	Buscar vacantes por palabra clave

👤 Autor
Desarrollado por Miguel.