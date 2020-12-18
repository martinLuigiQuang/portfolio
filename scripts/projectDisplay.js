import projects from './projects.js';

const projectDisplay = function() {
    const projectsSection = document.getElementsByClassName('projects')[0];

    const createFeaturedProjectDisplay = function(projects) {
        return `
            <div class="wrapper projectContainer">
                <h2>featured projects</h2>
                ${
                    projects.map((project, index) => {
                        return `
                            <div class="individualProject project--${index}">
                                <div class="projectImageContainer">
                                    <img src="../../${project.imgFile}" alt="Cover picture for project ${project.name}"/>
                                </div>
                                <div class="projectDescription">
                                    <h3>Project: ${project.name}</h3>
                                    <p>${project.technologies}</p>
                                    <p>Description: ${project.description}</p>
                                    <p>Features: ${project.features}</p>
                                    <p>Deadline: ${project.deadline}</p>
                                </div>
                            </div>
                        `;       
                    })
                }
            </div>
        `;
    };

    const buildProjectDisplay = function() {
        projectsSection.innerHTML = createFeaturedProjectDisplay(projects);
    };

    const init = function() {
        buildProjectDisplay();
    };

    return {
        init: init    
    };
}();

export default projectDisplay;