import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () =>{
    const skils = document.querySelector('.lista-conocimientos');
    // Limpiar  las alertas
    let alerts = document.querySelector('.alertas');
    if(alerts){
        clearAlerts();
    }
    if(skils){
        skils.addEventListener('click', addSkills);
        // Cuando estamos en la vista de editar, se llama la función
        skillsSelected();
    }

    const vacanciesList = document.querySelector('.panel-administracion');
    if(vacanciesList){
        vacanciesList.addEventListener('click', accionsList);
    }
});


const skills = new Set();


const addSkills = (e) =>{
   if(e.target.tagName === 'LI'){
        if(e.target.classList.contains('activo')){
            // eliminarlo del set y elliminar la clase
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        }else{
            // Agregar al set y agregar la clase
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
    }
    const skillsArray = [...skills]
    document.getElementById('skills').value= skillsArray;
}

const skillsSelected = () =>{
    const selected = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));

    // Inyectar los valores en el input hidden
    selected.forEach(select =>{
        skills.add(select.textContent);
    });
    
    const skillsArray = [...skills];
    document.getElementById('skills').value=skillsArray;
}

const clearAlerts = () =>{
    const alerts = document.querySelector('.alertas');
    const interval = setInterval(() => {
       if(alerts.children.length > 0){
        alerts.removeChild(alerts.children[0]);
    }else if(alerts.children.length === 0){
        alerts.parentElement.removeChild(alerts);
        clearInterval(interval);
    }
    },2000);
}

// eliminar vacantes
const accionsList = e => {
  e.preventDefault();

  if (e.target.dataset.eliminar) {
    Swal.fire({
      title: "¿Deseas Eliminar la vacante?",
      text: "¡Una vez eliminada, no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "No, Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${location.origin}/vacancy/delete/${e.target.dataset.eliminar}`;

        axios.delete(url, { params: { url } })
          .then(function(response) {
            if (response.status === 200) {
              Swal.fire({
                title: "Eliminado",
                text: response.data,
                icon: "success"
              });

              const card = e.target.closest('.vacante');
              if (card) card.remove();
            }
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error',
              text: 'No se ha podido eliminar la vacante'
            });
          });
      }
    });
  } else if (e.target.tagName === 'A') {
    window.location.href = e.target.href;
  }
};