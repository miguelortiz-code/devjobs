import Handlebars from 'handlebars';

const selectSkills = (selected = []) =>{
    const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];

    let html = '';
    skills.forEach(skill =>{
        html += `
            <li>${skill}</li>
        `
    });

    return new Handlebars.SafeString(html);
}

export{
    selectSkills
}