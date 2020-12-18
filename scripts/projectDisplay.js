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
                                </div> <!-- closing projectImageContainer -->
                                <div class="projectDescription">
                                    <h3>Project: ${project.name}</h3>
                                    <div class="descriptions">
                                        <h4>${project.technologies}</h4>
                                        <p><b>Description</b>: ${project.description}. <strong><em>Special features</em></strong>: ${project.features}</p>
                                        <p><b>Deadline</b>: ${project.deadline}</p>
                                    </div> <!-- descriptions -->
                                    <div class="links">
                                        <a href="">live link</a>
                                        <a href="">github repo</a>
                                    </div> <!-- closing links -->
                                </div> <!-- closing projectDescription -->
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