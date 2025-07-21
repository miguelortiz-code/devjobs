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