import Handlebars from 'handlebars';

const selectSkills = (selected = []) => {
    const skills = [
        'HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular',
        'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript',
        'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose',
        'SQL', 'MVC', 'SASS', 'WordPress'
    ];

    let html = '';
    skills.forEach(skill => {
        const isSelected = selected.includes(skill); // ← compara
        html += `<li ${isSelected ? 'class="activo"' : ''}>${skill}</li>`;
    });

    return new Handlebars.SafeString(html);
};

const typeContract = function (selected, options) {
    const html = options.fn(this);
    const finalHtml = html.replace(
        new RegExp(`value="${selected}"`),
        `value="${selected}" selected`
    );
    return new Handlebars.SafeString(finalHtml);
};

const showAlerts = (alerts = {}) => {
    let html = '';

    // Recorrer cada tipo de alerta: error, success, etc.
     Object.keys(alerts).forEach(category => {
        if (Array.isArray(alerts[category])) {
            alerts[category].forEach(msg => {
                html += `
                    <div class="${category} alerta">
                        ${msg}
                    </div>
                `;
            });
        }
    });
    return new Handlebars.SafeString(html);
};

export{
    selectSkills,
    typeContract,
    showAlerts
}