import projects from './projects.js';

const projectDisplay = function() {
    const projectsSection = document.getElementsByClassName('projects')[0];

    function createFeaturedProjectDisplay(projects) {
        const projectDisplay = `
            <div class="wrapper projectContainer">
                <h2>Featured Projects</h2>
                ${
                    projects.map((project, index) => {
                        return `
                            <div class="individualProject project--${index}">
                                <button class="projectImageContainer">
                                    <img src="../../${project.imgFile}" alt="Cover picture for project ${project.name}"/>
                                    <div class="projectDescription">
                                        <h3>Project: ${project.name}</h3>
                                        <h4>${project.technologies}</h4>
                                        <p><strong><em>Special features</em></strong>: ${project.features}</p>
                                        <div class="links">
                                            <a href="${project.liveLink}">live link</a>
                                            <a href="${project.gitHubRepo}">github repo</a>
                                        </div> <!-- closing links -->
                                    </div> <!-- closing projectDescription -->
                                </button> <!-- closing projectImageContainer -->
                            </div> <!-- closing individualProject project--${index} -->
                        `;       
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
            </div>
        `;
        const templateFragment = document.createElement('template');
        templateFragment.innerHTML = projectDisplay;
        return templateFragment;
    };

    function buildProjectDisplay() {
        const projectDisplay = createFeaturedProjectDisplay(projects);
        projectsSection.appendChild(projectDisplay.content);
    };

    function init() {
        buildProjectDisplay();
    };

    return {
        init: init    
    };
}();

export default projectDisplay;